import { trimHTML } from "./trim-raw-html";
import axios from "axios";

export const fetchHTML = async (url: string) => {
  const { data: html } = await axios.get(url);

  return trimHTML(html);
};
