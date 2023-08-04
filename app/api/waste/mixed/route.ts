import { parseMixedDetails } from "@/utils/scrapper/parse-mixed-details";
import { parseMetadata } from "@/utils/scrapper/parse-metadata";
import { fetchData } from "@/utils/scrapper/fetch-data";
import { NextResponse } from "next/server";
import { defaultStreet } from "@/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const street = searchParams.get("street") || defaultStreet.id;
  const date = searchParams.get("date") || null;
  const days = searchParams.get("days") || "64";

  let url = new URL("https://odpadykomunalne.tczew.pl/?p=1-harmonogram&t-1");

  url.searchParams.append("s", street);
  if (date) url.searchParams.append("date", date);
  if (days) url.searchParams.append("d", days);

  const mixed = await fetchData(url.toString(), parseMixedDetails);
  const metadata = await fetchData(url.toString(), parseMetadata);

  return NextResponse.json({
    original_data_url: url.toString(),
    metadata,
    waste: {
      mixed,
    },
  });
}
