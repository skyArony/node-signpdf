"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPageLength = void 0;
var _getPagesDictionaryRef = _interopRequireDefault(require("./getPagesDictionaryRef"));
var _findObject = _interopRequireDefault(require("./findObject"));
var _readPdf = _interopRequireDefault(require("./readPdf"));
var _utils = require("@signpdf/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Finds the number of pages in the PDF.
 *
 * @param {Buffer} pdfBuffer The entire PDF file as a Buffer.
 * @returns {number} The number of pages in the PDF.
 */
const getPageLength = pdfBuffer => {
  const pdf = (0, _utils.removeTrailingNewLine)(pdfBuffer);
  const info = (0, _readPdf.default)(pdf);
  const pagesRef = (0, _getPagesDictionaryRef.default)(info);
  const pagesDictionary = (0, _findObject.default)(pdfBuffer, info.xref, pagesRef);
  const kidsPosition = pagesDictionary.indexOf("/Kids");
  const kidsStart = pagesDictionary.indexOf("[", kidsPosition) + 1;
  const kidsEnd = pagesDictionary.indexOf("]", kidsPosition);
  const pages = pagesDictionary.slice(kidsStart, kidsEnd).toString();
  return pages.trim().split("R").map(ref => ref.trim() + "R").slice(0, -1).length;
};
exports.getPageLength = getPageLength;