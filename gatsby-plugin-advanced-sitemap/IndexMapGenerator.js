"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _xml = _interopRequireDefault(require("xml"));
var _moment = _interopRequireDefault(require("moment"));
var _url = _interopRequireDefault(require("url"));
var _path = _interopRequireDefault(require("path"));
var utils = _interopRequireWildcard(require("./utils"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var XMLNS_DECLS = {
  _attr: {
    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
  }
};
var SiteMapIndexGenerator = exports.default = /*#__PURE__*/function () {
  function SiteMapIndexGenerator(options) {
    options = options || {};
    this.types = options.types;
  }
  var _proto = SiteMapIndexGenerator.prototype;
  _proto.getXml = function getXml(options) {
    var urlElements = this.generateSiteMapUrlElements(options);
    var data = {
      // Concat the elements to the _attr declaration
      sitemapindex: [XMLNS_DECLS].concat(urlElements)
    };

    // Return the xml
    return utils.sitemapsUtils.getDeclarations(options) + (0, _xml.default)(data);
  };
  _proto.generateSiteMapUrlElements = function generateSiteMapUrlElements(_ref) {
    var _this = this;
    var sources = _ref.sources,
      siteUrl = _ref.siteUrl,
      pathPrefix = _ref.pathPrefix,
      resourcesOutput = _ref.resourcesOutput;
    return _lodash.default.map(sources, function (source) {
      var filePath = resourcesOutput.replace(/:resource/, source.name).replace(/^\//, "");
      var siteMapUrl = source.url ? source.url : _url.default.resolve(siteUrl, _path.default.join(pathPrefix, filePath));
      var lastModified = source.url ? (0, _moment.default)(new Date(), _moment.default.ISO_8601).toISOString() : _this.types[source.sitemap].lastModified || (0, _moment.default)(new Date(), _moment.default.ISO_8601).toISOString();
      return {
        sitemap: [{
          loc: siteMapUrl
        }, {
          lastmod: (0, _moment.default)(lastModified).toISOString()
        }]
      };
    });
  };
  return SiteMapIndexGenerator;
}();