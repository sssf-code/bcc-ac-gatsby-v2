"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.writeFile = exports.withoutTrailingSlash = exports.sitemapsUtils = exports.renameFile = exports.readFile = void 0;
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _pify = _interopRequireDefault(require("pify"));
var withoutTrailingSlash = exports.withoutTrailingSlash = function withoutTrailingSlash(path) {
  return path === "/" ? path : path.replace(/\/$/, "");
};
var writeFile = exports.writeFile = (0, _pify.default)(_fsExtra.default.writeFile);
var renameFile = exports.renameFile = (0, _pify.default)(_fsExtra.default.rename);
var readFile = exports.readFile = (0, _pify.default)(_fsExtra.default.readFile);
var sitemapsUtils = exports.sitemapsUtils = {
  getDeclarations: function getDeclarations() {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "<?xml-stylesheet type=\"text/xsl\" href=\"sitemap.xsl\"?>";
  }
};