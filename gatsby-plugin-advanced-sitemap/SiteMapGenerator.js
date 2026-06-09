"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _lodash = _interopRequireDefault(require("lodash"));
var _BaseSiteMapGenerator2 = _interopRequireDefault(require("./BaseSiteMapGenerator"));
var SiteMapGenerator = exports.default = /*#__PURE__*/function (_BaseSiteMapGenerator) {
  function SiteMapGenerator(opts, type) {
    var _this;
    _this = _BaseSiteMapGenerator.call(this) || this;
    _this.name = type || "pages";
    _lodash.default.extend(_this, opts);
    return _this;
  }
  (0, _inheritsLoose2.default)(SiteMapGenerator, _BaseSiteMapGenerator);
  return SiteMapGenerator;
}(_BaseSiteMapGenerator2.default);