import { dateOptions, dateLocale } from "./config";
import { promises } from "fs";

export const splitDateIntoParts = (date: string): string[] => {
  return date.replace(/[^\\d]/g, "-").split("-");
};

export const writeFileSync = (path: string, data: string): Promise<void> =>
  promises.writeFile(path, data);
