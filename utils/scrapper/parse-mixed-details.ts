import { wasteTypesMapping } from "@/config";

export const parseMixedDetails = ($: any) => {
  const $Scripts = $("table script");

  let selectors: any[] = [];
  let details: { waste: any; date: any }[] = [];

  $Scripts.each((index: any, script: any) => {
    const scriptText = $(script).text().trim();
    const $hideCalls = scriptText.match(/\$\(['"](.*?)['"]\)\.hide\(\);/g);

    if ($hideCalls) {
      $hideCalls.forEach((call: string) => {
        const selectorMatch = call.match(/\$\(['"](.*?)['"]\)/);
        if (selectorMatch) {
          const selector = selectorMatch[1];
          selectors.push(selector);
        }
      });
    }
  });

  const $TRs = $("table tr");

  $TRs.each((index: any, tr: any) => {
    const matchesSelector = selectors.some((selector) => $(tr).is(selector));

    if (!matchesSelector) {
      const dateText = $(tr).text().trim();
      const date = dateText
        ? dateText.match(/\d{2}\.\d{2}\.\d{4}/g).join("-")
        : null;

      details.push({
        waste: wasteTypesMapping.ZMIESZANE,
        date,
      });
    }
  });

  details.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return details;
};
