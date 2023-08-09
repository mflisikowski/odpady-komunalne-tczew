import { load } from "cheerio";

/**
 * Fetches data from the provided URL and parses it using the given parser function.
 * @param url - The URL to fetch data from.
 * @param parser - The function to parse the fetched data.
 * @returns The parsed data or an empty array if there was an error.
 */
export const fetchData = async (url: string, parser: any): Promise<any[]> => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);
    return parser($);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
};
