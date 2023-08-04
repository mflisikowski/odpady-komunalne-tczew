export const parseMetadata = ($: any) => {
  const [$subtitle, $title] = [
    "#content div.row-form-top > div:nth-child(2) > div:nth-child(1)",
    "#content div.row-form-top > div.page-header-title > h2",
  ].map((element) => $(element).text().trim());

  return {
    subtitle: $subtitle.trim(),
    title: $title,
  };
};
