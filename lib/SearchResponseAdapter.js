(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./support/utils", "he"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./support/utils"), require("he"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.utils, global.he);
    global.SearchResponseAdapter = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _utils, _he) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.SearchResponseAdapter = void 0;
  _he = _interopRequireDefault(_he);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var SearchResponseAdapter = /*#__PURE__*/function () {
    function SearchResponseAdapter(typesenseResponse, instantsearchRequest) {
      _classCallCheck(this, SearchResponseAdapter);

      this.typesenseResponse = typesenseResponse;
      this.instantsearchRequest = instantsearchRequest;
    }

    _createClass(SearchResponseAdapter, [{
      key: "_adaptHits",
      value: function _adaptHits(typesenseHits) {
        var _this = this;

        var adaptedResult = [];
        adaptedResult = typesenseHits.map(function (typesenseHit) {
          var adaptedHit = _objectSpread({}, typesenseHit.document);

          adaptedHit.objectID = typesenseHit.document.id;
          adaptedHit._snippetResult = _this._adaptHighlightResult(typesenseHit, "snippet");
          adaptedHit._highlightResult = _this._adaptHighlightResult(typesenseHit, "value");
          return adaptedHit;
        });
        return adaptedResult;
      }
    }, {
      key: "_adaptHighlightResult",
      value: function _adaptHighlightResult(typesenseHit, snippetOrValue) {
        var _this2 = this;

        // Algolia lists all searchable attributes in this key, even if there are no matches
        // So do the same and then override highlights
        var result = Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(typesenseHit.document).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              attribute = _ref2[0],
              value = _ref2[1];

          return _defineProperty({}, attribute, {
            value: value,
            matchLevel: "none",
            matchedWords: []
          });
        }))));
        typesenseHit.highlights.forEach(function (highlight) {
          result[highlight.field] = {
            value: highlight[snippetOrValue] || highlight["".concat(snippetOrValue, "s")],
            matchLevel: "full",
            matchedWords: [] // Todo: Fix MatchedWords

          };
        }); // Now convert any values that have an array value
        // Also, replace highlight tag

        Object.entries(result).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              k = _ref5[0],
              v = _ref5[1];

          var attribute = k;
          var value = v.value,
              matchLevel = v.matchLevel,
              matchedWords = v.matchedWords;

          if (Array.isArray(value)) {
            result[attribute] = [];
            value.forEach(function (v) {
              result[attribute].push({
                value: _this2._adaptHighlightTag(_he["default"].decode("".concat(v))),
                matchLevel: matchLevel,
                // TODO: Fix MatchLevel for array
                matchedWords: matchedWords // TODO: Fix MatchedWords for array

              });
            });
          } else {
            // Convert all values to strings
            result[attribute].value = _this2._adaptHighlightTag(_he["default"].decode("".concat(value)));
          }
        });
        return result;
      }
    }, {
      key: "_adaptFacets",
      value: function _adaptFacets(typesenseFacetCounts) {
        var adaptedResult = {};
        typesenseFacetCounts.forEach(function (facet) {
          Object.assign(adaptedResult, _defineProperty({}, facet.field_name, Object.assign.apply(Object, [{}].concat(_toConsumableArray(facet.counts.map(function (count) {
            return _defineProperty({}, count.value, count.count);
          }))))));
        });
        return adaptedResult;
      }
    }, {
      key: "_adaptFacetStats",
      value: function _adaptFacetStats(typesenseFacetCounts) {
        var adaptedResult = {};
        typesenseFacetCounts.forEach(function (facet) {
          if (Object.keys(facet.stats).length > 0) {
            Object.assign(adaptedResult, _defineProperty({}, facet.field_name, facet.stats));
          }
        });
        return adaptedResult;
      }
    }, {
      key: "adapt",
      value: function adapt() {
        var adaptedResult = {
          hits: this._adaptHits(this.typesenseResponse.hits),
          nbHits: this.typesenseResponse.found,
          page: this.typesenseResponse.page,
          nbPages: this._adaptNumberOfPages(),
          hitsPerPage: this.typesenseResponse.hits.length,
          facets: this._adaptFacets(this.typesenseResponse.facet_counts || []),
          facets_stats: this._adaptFacetStats(this.typesenseResponse.facet_counts || {}),
          query: this.typesenseResponse.request_params.q,
          processingTimeMS: this.typesenseResponse.search_time_ms
        }; // console.log(adaptedResult);

        return adaptedResult;
      }
    }]);

    return SearchResponseAdapter;
  }();

  _exports.SearchResponseAdapter = SearchResponseAdapter;
  Object.assign(SearchResponseAdapter.prototype, _utils.utils);
});