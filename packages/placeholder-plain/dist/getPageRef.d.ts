/**
 * Finds the reference to a specified page, supporting negative indices to count from the end.
 * 0 is the first page, -1 is the last page, -2 is the second to last page, etc.
 *
 * @param {Buffer} pdfBuffer The entire PDF file as a Buffer.
 * @param {Object} info As extracted from readPdf().
 * @param {number} pageIndex Index of the page to retrieve (zero-based). Negative values count from the end.
 * @returns {string} Reference to the page.
 */
export default function getPageRef(pdfBuffer: Buffer, info: any, pageIndex?: number): string;
//# sourceMappingURL=getPageRef.d.ts.map