import { queryUrls } from "./query";
import { load } from "cheerio";
import axios from "axios";

const wasteTypesMapping: any = {
  ZIELONE: "Odpady zielone",
  "W-G NA TEL": "Wielkogabarytowe na telefon",
  MAKULATURA: "Makulatura",
  METALE: "Metale",
  SZKŁO: "Szkło",
  POPIÓŁ: "Popiół",
  ZMIESZANE: "Zmieszane",
};

function trimRawHTML(html: string): string {
  const multipleSpaces = /\s\s+/g;
  const emptyLines = /\n\s*\n/g;

  return html.replace(multipleSpaces, "").replace(emptyLines, "");
}

async function fetchHTML(url: string) {
  const { data: html } = await axios.get(url);
  return trimRawHTML(html);
}

function parseSelectiveDetails($: any) {
  let details: { waste: any; date: any }[] = [];
  const $TRs = $("table tr");

  $TRs.each((index: any, tr: any) => {
    const $UL = $(tr).find("ul");

    if ($UL.text().trim() !== "") {
      const $smallElements = $(tr).find("small");
      let smallTexts: string[] = [];

      $smallElements.each((index: any, small: any) => {
        smallTexts.push($(small).text().trim());
      });

      const dateText = smallTexts.find((text) => /\d+/g.test(text));

      let date: string | null = null;
      if (dateText) {
        const matchResult = dateText.match(/\d{2}\.\d{2}\.\d{4}/g);
        date = matchResult ? matchResult.join("-") : null;
      }

      const wasteText = smallTexts.find(
        (text) => wasteTypesMapping[text] !== undefined
      );
      const waste = wasteText ? wasteTypesMapping[wasteText] : null;

      if (date || waste) {
        details.push({
          waste,
          date,
        });
      }
    }
  });

  details.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return details;
}

function parseMixedDetails($: any) {
  const $Scripts = $("table script");

  let selectors: any[] = [];
  let details: { waste: any; date: any }[] = [];

  $Scripts.each((index: any, script: any) => {
    const scriptText = $(script).text().trim();
    const $hideCalls = scriptText.match(/\$\(['"](.*?)['"]\)\.hide\(\);/g);

    if ($hideCalls) {
      $hideCalls.forEach((call: string) => {
        const selectorMatch = call.match(/\$\(['"](.*?)['"]\)/);
        if (selectorMatch) {
          const selector = selectorMatch[1];
          selectors.push(selector);
        }
      });
    }
  });

  const $TRs = $("table tr");

  $TRs.each((index: any, tr: any) => {
    const matchesSelector = selectors.some((selector) => $(tr).is(selector));

    if (!matchesSelector) {
      const dateText = $(tr).text().trim();
      const date = dateText
        ? dateText.match(/\d{2}\.\d{2}\.\d{4}/g).join("-")
        : null;

      details.push({
        waste: wasteTypesMapping.ZMIESZANE,
        date,
      });
    }
  });

  details.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return details;
}

function parseMetadata($: any) {
  const [$subtitle, $street, $title] = [
    "#content div.row-form-top > div:nth-child(2) > div:nth-child(1)",
    "#content div.row-form-top > div:nth-child(2) > div:nth-child(2)",
    "#content div.row-form-top > div.page-header-title > h2",
  ].map((element) => $(element).text().trim());

  return {
    subtitle: $subtitle.trim(),
    street: $street.replace("Ulica:", "").trim(),
    title: $title,
  };
}

const selectiveData = async () => {
  const html = await fetchHTML(queryUrls.selective);
  let $ = load(html);

  return parseSelectiveDetails($);
};

const metadataData = async () => {
  const html = await fetchHTML(queryUrls.mixed);
  let $ = load(html);

  return parseMetadata($);
};

const mixedData = async () => {
  const html = await fetchHTML(queryUrls.mixed);
  let $ = load(html);

  return parseMixedDetails($);
};

const groupByWasteType = (wasteData: any[]) => {
  const grouped: { [key: string]: any[] } = {};

  wasteData.forEach((item) => {
    const key = item.waste;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  });

  return grouped;
};

export const scrapper = async () => {
  const selective = await selectiveData();
  const metadata = await metadataData();
  const mixed = await mixedData();

  const combinedWaste = [...selective, ...mixed];
  const groupedWaste = groupByWasteType(combinedWaste);

  return {
    metadata,
    waste: groupedWaste,
  };
};
