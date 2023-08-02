export const trimHTML = (html: string): string => {
  const multipleSpaces = /\s\s+/g;
  const emptyLines = /\n\s*\n/g;

  return html.replace(multipleSpaces, "").replace(emptyLines, "");
};
