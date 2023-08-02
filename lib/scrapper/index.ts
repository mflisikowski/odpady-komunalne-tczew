import { parseSelectiveDetails } from "@/utils/scrapper/parse-selective-details";
import { parseMixedDetails } from "@/utils/scrapper/parse-mixed-details";
import { groupByWasteType } from "@/utils/scrapper/group-waste";
import { parseMetadata } from "@/utils/scrapper/parse-metadata";
import { fetchHTML } from "@/utils/scrapper/fetch-html";
import { queryUrls } from "@/utils/getQueryString";
import { load } from "cheerio";

const fetchData = async (url: string, parser: any) => {
  try {
    const html = await fetchHTML(url);
    let $ = load(html);
    return parser($);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
};

export const scrapper = async () => {
  const [selective, metadata, mixed] = await Promise.all([
    fetchData(queryUrls.selective, parseSelectiveDetails),
    fetchData(queryUrls.mixed, parseMetadata),
    fetchData(queryUrls.mixed, parseMixedDetails),
  ]);

  const combinedWaste = [...selective, ...mixed];
  const groupedWaste = groupByWasteType(combinedWaste);

  return {
    metadata,
    waste: groupedWaste,
  };
};
