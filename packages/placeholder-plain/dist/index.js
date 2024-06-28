"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _plainAddPlaceholder = require("./plainAddPlaceholder");
Object.keys(_plainAddPlaceholder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _plainAddPlaceholder[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _plainAddPlaceholder[key];
    }
  });
});
var _getPageLength = require("./getPageLength");
Object.keys(_getPageLength).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getPageLength[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getPageLength[key];
    }
  });
});