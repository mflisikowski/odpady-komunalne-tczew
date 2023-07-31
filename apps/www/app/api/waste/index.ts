import { notFound } from 'next/navigation';
import { scrapper } from "./scrapper";

import 'server-only';

export async function getWasteData() {
  const data = await scrapper();

  if (!data) {
    notFound();
  }

  return data;
}
