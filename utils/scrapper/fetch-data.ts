import { load } from "cheerio";

export const revalidate = 60 * 60 * 6; // 24 hours

export const fetchData = async (url: string, parser: any) => {
  try {
    const response = await fetch(url, {
      next: {
        revalidate,
      },
    });

    const html = await response.text();
    let $ = load(html);
    return parser($);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
};
