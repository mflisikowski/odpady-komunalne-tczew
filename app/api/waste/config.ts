export const paths = {
  json: `./data/data.json`,
};

export const dateLocale: string = "pl-PL";
export const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "numeric",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export const queryBaseURL: string =
  "https://odpadykomunalne.tczew.pl/?p=1-harmonogram";

export const defaultStreet = {
  name: "Romana Klima",
  id: "b3f753",
};

export const defaultDays: string = "64";

export const defaultQuery = {
  street: defaultStreet.id,
  days: defaultDays,
};

