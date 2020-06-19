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
    global.Configuration = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Configuration = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var Configuration = /*#__PURE__*/function () {
    function Configuration() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Configuration);

      this.server = options.server || {
        masterNode: {
          host: "localhost",
          port: "8108",
          path: "",
          protocol: "http"
        }
      };
      this.additionalSearchParameters = options.additionalSearchParameters || {};
      this.additionalSearchParameters.queryBy = this.additionalSearchParameters.queryBy || "";
      this.additionalSearchParameters.highlightFullFields = this.additionalSearchParameters.highlightFullFields || this.additionalSearchParameters.queryBy;
    }

    _createClass(Configuration, [{
      key: "validate",
      value: function validate() {
        if (this.additionalSearchParameters.queryBy.length === 0) {
          throw new Error("Missing required parameter: additionalSearchParameters.queryBy");
        }
      }
    }]);

    return Configuration;
  }();

  _exports.Configuration = Configuration;
});