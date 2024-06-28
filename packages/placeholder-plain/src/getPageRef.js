import getPagesDictionaryRef from "./getPagesDictionaryRef";
import findObject from "./findObject";

/**
 * Finds the reference to a specified page, supporting negative indices to count from the end.
 * 0 is the first page, -1 is the last page, -2 is the second to last page, etc.
 *
 * @param {Buffer} pdfBuffer The entire PDF file as a Buffer.
 * @param {Object} info As extracted from readPdf().
 * @param {number} pageIndex Index of the page to retrieve (zero-based). Negative values count from the end.
 * @returns {string} Reference to the page.
 */
export default function getPageRef(pdfBuffer, info, pageIndex = 0) {
  const pagesRef = getPagesDictionaryRef(info);
  const pagesDictionary = findObject(pdfBuffer, info.xref, pagesRef);
  const kidsPosition = pagesDictionary.indexOf("/Kids");
  const kidsStart = pagesDictionary.indexOf("[", kidsPosition) + 1;
  const kidsEnd = pagesDictionary.indexOf("]", kidsPosition);
  const pages = pagesDictionary.slice(kidsStart, kidsEnd).toString();

  // Split the pages references and normalize the references
  const pageRefs = pages
    .trim()
    .split("R")
    .map((ref) => ref.trim() + "R")
    .slice(0, -1);

  // Handle negative indices
  if (pageIndex < 0) {
    pageIndex = pageRefs.length + pageIndex; // Convert negative index to positive by counting from the end
  }

  // Check if the pageIndex is still out of bounds
  if (pageIndex < 0 || pageIndex >= pageRefs.length) {
    throw new Error("Page index out of bounds");
  }

  return pageRefs[pageIndex].trim();
}
