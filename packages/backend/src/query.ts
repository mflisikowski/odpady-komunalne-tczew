import { defaultQuery, queryBaseURL } from "./config";

const queryArguments: string = process?.argv?.slice(2)?.join("&")?.toString();
const isQueryArgumentsValid: boolean = queryArguments.length > 0;

const params = new URLSearchParams(
  isQueryArgumentsValid ? queryArguments : undefined
);

if (!isQueryArgumentsValid) {
  params.append("s", defaultQuery.street);
  params.append("d", defaultQuery.days);
}

const queryString: string = params.toString();

export const queryUrls = {
  selective: `${queryBaseURL}&t=2&${queryString}`,
  mixed: `${queryBaseURL}&t=1&${queryString}`,
};
