import { load } from "cheerio";

export const fetchData = async (url: string, parser: any) => {
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    const html = await response.text();
    let $ = load(html);
    return parser($);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
};
