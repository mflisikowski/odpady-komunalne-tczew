import { wasteTypesMapping } from "@/config";

export const parseSelectiveDetails = ($: any) => {
  let details: { waste: any; date: any }[] = [];
  const $TRs = $("table tr");

  $TRs.each((index: any, tr: any) => {
    const $UL = $(tr).find("ul");

    if ($UL.text().trim() !== "") {
      const $smallElements = $(tr).find("small");
      let smallTexts: string[] = [];

      $smallElements.each((index: any, small: any) => {
        smallTexts.push($(small).text().trim());
      });

      const dateText = smallTexts.find((text) => /\d+/g.test(text));

      let date: string | null = null;
      if (dateText) {
        const matchResult = dateText.match(/\d{2}\.\d{2}\.\d{4}/g);
        date = matchResult ? matchResult.join("-") : null;
      }

      const wasteText = smallTexts.find(
        (text) => wasteTypesMapping[text] !== undefined
      );
      const waste = wasteText ? wasteTypesMapping[wasteText] : null;

      if (date || waste) {
        details.push({
          waste,
          date,
        });
      }
    }
  });

  details.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return details;
};
