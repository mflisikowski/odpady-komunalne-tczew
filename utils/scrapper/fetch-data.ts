import { fetchHTML } from "@/utils/scrapper/fetch-html";
import { load } from "cheerio";

export const fetchData = async (url: string, parser: any) => {
  try {
    const html = await fetchHTML(url);
    let $ = load(html);
    return parser($);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
};
