import { parseStreetDetails } from "@/utils/scrapper/parse-street-details";
import { fetchData } from "@/utils/scrapper/fetch-data";
import { NextResponse } from "next/server";

export async function GET() {
  const streets = await fetchData(
    `https://odpadykomunalne.tczew.pl/module/dynamic/harmonogram-s.php`,
    parseStreetDetails
  );

  return NextResponse.json({
    streets,
  });
}
