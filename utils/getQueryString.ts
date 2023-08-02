// utils/getQueryString.js
import { DEFAULTS, QUERY_BASE_URL } from "@/config";

export const getQueryParams = (queryArguments: string): string => {
  const params = new URLSearchParams(queryArguments);

  if (!params.has("s")) params.append("s", DEFAULTS.street.id);
  if (!params.has("d")) params.append("d", DEFAULTS.days);

  return params.toString();
};

export const queryArguments: string = process?.argv
  ?.slice(2)
  ?.join("&")
  ?.toString();
export const queryString: string = getQueryParams(queryArguments);

export const queryUrls = {
  selective: `${QUERY_BASE_URL}&t=2&${queryString}`,
  mixed: `${QUERY_BASE_URL}&t=1&${queryString}`,
};
