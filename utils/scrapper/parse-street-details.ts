import * as cheerio from "cheerio";

const extractId = (onClickAttr: string | undefined): string => {
  const idMatch = onClickAttr?.match(/s=([a-z0-9]+)/i);
  return idMatch ? idMatch[1] : "";
};

const extractWholeAndSuffix = (
  streetName: string
): [boolean | undefined, string | undefined, string] => {
  let whole: boolean | undefined;
  let suffix: string | undefined;

  if (streetName.includes("(cała)")) {
    whole = true;
    suffix = "(cała)";
    streetName = streetName.replace("(cała)", "");
  } else if (streetName.includes("(pozostałe)")) {
    whole = false;
    suffix = "(pozostałe)";
    streetName = streetName.replace("(pozostałe)", "");
  }

  return [whole, suffix, streetName.trim()];
};

const extractHouseNumbers = (
  streetName: string,
  whole: boolean | undefined
): [string[] | undefined, string, boolean | undefined] => {
  const houseNumbersMatch = streetName.match(/\((\d+(,\d+)*)\)/);
  let houseNumbers: string[] | undefined;

  if (houseNumbersMatch) {
    houseNumbers = houseNumbersMatch[1].split(",");
    streetName = streetName.replace(houseNumbersMatch[0], "");
    whole = false; // Set 'whole' to false if there are specific house numbers
  }

  return [houseNumbers, streetName.trim(), whole];
};

export function parseStreetDetails($: cheerio.CheerioAPI): {
  id: string;
  name: string;
  whole?: boolean;
  houseNumbers?: string[];
  suffix?: string;
}[] {
  const streets: {
    id: string;
    name: string;
    whole?: boolean;
    houseNumbers?: string[];
    suffix?: string;
  }[] = [];

  $("div.modal-w").each((i, elem) => {
    let streetName = $(elem).text().trim();
    const onClickAttr = $(elem).attr("onclick");

    const id = extractId(onClickAttr);
    let [whole, suffix, nameWithoutSuffix] = extractWholeAndSuffix(streetName);
    let [houseNumbers, finalName, finalWhole] = extractHouseNumbers(
      nameWithoutSuffix,
      whole
    );

    if (!id) {
      return;
    }

    streets.push({
      id,
      name: finalName,
      whole: finalWhole,
      houseNumbers,
      suffix,
    });
  });

  return streets;
}
