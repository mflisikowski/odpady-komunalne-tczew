/**
 * Parses the metadata from a webpage.
 * @param $ - The library object used for parsing HTML.
 * @returns An object containing the extracted subtitle and title.
 */
export const parseMetadata = ($: any) => {
  const subtitle = $("#content div.row-form-top > div:nth-child(2) > div:nth-child(1)").text().trim();
  const title = $("#content div.row-form-top > div.page-header-title > h2").text().trim();

  return {
    subtitle,
    title,
  };
};
