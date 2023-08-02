import { notFound } from 'next/navigation';
import { scrapper } from "../../../lib/scrapper";

import 'server-only';

export async function getWasteData() {
  const data = await scrapper();

  if (!data) {
    notFound();
  }

  return {
    metadata: data.metadata,
    waste: data.waste,
  };
}
