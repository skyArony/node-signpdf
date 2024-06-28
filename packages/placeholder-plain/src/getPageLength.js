import getPagesDictionaryRef from "./getPagesDictionaryRef";
import findObject from "./findObject";
import readPdf from "./readPdf";
import { removeTrailingNewLine } from "@signpdf/utils";

/**
 * Finds the number of pages in the PDF.
 *
 * @param {Buffer} pdfBuffer The entire PDF file as a Buffer.
 * @returns {number} The number of pages in the PDF.
 */
export const getPageLength = (pdfBuffer) => {
  const pdf = removeTrailingNewLine(pdfBuffer);
  const info = readPdf(pdf);
  const pagesRef = getPagesDictionaryRef(info);
  const pagesDictionary = findObject(pdfBuffer, info.xref, pagesRef);
  const kidsPosition = pagesDictionary.indexOf("/Kids");
  const kidsStart = pagesDictionary.indexOf("[", kidsPosition) + 1;
  const kidsEnd = pagesDictionary.indexOf("]", kidsPosition);
  const pages = pagesDictionary.slice(kidsStart, kidsEnd).toString();

  return pages
    .trim()
    .split("R")
    .map((ref) => ref.trim() + "R")
    .slice(0, -1).length;
};
