(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.utils = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.utils = void 0;
  var utils = {
    _adaptHighlightTag: function _adaptHighlightTag(value) {
      return value.replace(new RegExp("<mark>", "g"), this.instantsearchRequest.params.highlightPreTag).replace(new RegExp("</mark>", "g"), this.instantsearchRequest.params.highlightPostTag);
    },
    _adaptNumberOfPages: function _adaptNumberOfPages() {
      var result = this.typesenseResponse.found / this.typesenseResponse.request_params.per_page;

      if (Number.isFinite(result)) {
        return Math.ceil(result);
      } else {
        return 1;
      }
    }
  };
  _exports.utils = utils;
});