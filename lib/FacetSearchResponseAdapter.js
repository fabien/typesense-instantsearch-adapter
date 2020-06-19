(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./support/utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./support/utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.utils);
    global.FacetSearchResponseAdapter = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.FacetSearchResponseAdapter = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var FacetSearchResponseAdapter = /*#__PURE__*/function () {
    function FacetSearchResponseAdapter(typesenseResponse, instantsearchRequest) {
      _classCallCheck(this, FacetSearchResponseAdapter);

      this.typesenseResponse = typesenseResponse;
      this.instantsearchRequest = instantsearchRequest;
    }

    _createClass(FacetSearchResponseAdapter, [{
      key: "_adaptFacetHits",
      value: function _adaptFacetHits(typesenseFacetCounts) {
        var _this = this;

        var adaptedResult = {};
        var facet = typesenseFacetCounts.find(function (facet) {
          return facet.field_name === _this.instantsearchRequest.params.facetName;
        });
        adaptedResult = facet.counts.map(function (facetCount) {
          return {
            value: facetCount.value,
            highlighted: _this._adaptHighlightTag(facetCount.highlighted),
            count: facetCount.count
          };
        });
        return adaptedResult;
      }
    }, {
      key: "adapt",
      value: function adapt() {
        var adaptedResult = {
          facetHits: this._adaptFacetHits(this.typesenseResponse.facet_counts),
          exhaustiveFacetsCount: true,
          processingTimeMS: this.typesenseResponse.search_time_ms
        };
        return adaptedResult;
      }
    }]);

    return FacetSearchResponseAdapter;
  }();

  _exports.FacetSearchResponseAdapter = FacetSearchResponseAdapter;
  Object.assign(FacetSearchResponseAdapter.prototype, _utils.utils);
});