export const BASE_URL: string = "https://odpadykomunalne.tczew.pl";

export const QUERY_BASE_URL: string = `${BASE_URL}/?p=1-harmonogram`;

export const DEFAULTS = {
  street: {
    name: "Romana Klima",
    id: "b3f753",
  },
  days: "64",
};

export const defaultStreet = {
  name: "Romana Klima",
  id: "b3f753",
};

export const defaultDays: string = "64";

export const defaultQuery = {
  street: defaultStreet.id,
  days: defaultDays,
};

export const wasteTypesMapping: any = {
  ZIELONE: "Odpady zielone",
  "W-G NA TEL": "Wielkogabarytowe na telefon",
  MAKULATURA: "Makulatura",
  METALE: "Metale",
  SZKŁO: "Szkło",
  POPIÓŁ: "Popiół",
  ZMIESZANE: "Zmieszane",
};
