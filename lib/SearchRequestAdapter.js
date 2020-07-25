"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchRequestAdapter = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SearchRequestAdapter = /*#__PURE__*/function () {
  _createClass(SearchRequestAdapter, null, [{
    key: "INDEX_NAME_MATCHING_REGEX",
    get: function get() {
      return new RegExp("^(.+?)(?=(/sort/(.*))|$)");
    }
  }]);

  function SearchRequestAdapter(instantsearchRequest, typesenseClient, additionalSearchParameters) {
    _classCallCheck(this, SearchRequestAdapter);

    this.instantsearchRequest = instantsearchRequest;
    this.typesenseClient = typesenseClient;
    this.additionalSearchParameters = additionalSearchParameters;
  }

  _createClass(SearchRequestAdapter, [{
    key: "_adaptFacetFilters",
    value: function _adaptFacetFilters(facetFilters) {
      var adaptedResult = "";

      if (!facetFilters) {
        return adaptedResult;
      }

      var intermediateFacetFilters = {}; // Need to transform:
      // faceFilters = [["facet1:value1", "facet1:value2"], "facet2:value3"]]
      //
      // Into this:
      // intermediateFacetFilters = {
      //     "facet1": ["value1", "value2"],
      //     "facet2": ["value1", "value2"]
      // }

      facetFilters.flat().forEach(function (facetFilter) {
        var _facetFilter$split = facetFilter.split(":"),
            _facetFilter$split2 = _slicedToArray(_facetFilter$split, 2),
            facetName = _facetFilter$split2[0],
            facetValue = _facetFilter$split2[1];

        intermediateFacetFilters[facetName] = intermediateFacetFilters[facetName] || [];
        intermediateFacetFilters[facetName].push(facetValue);
      }); // Need to transform this:
      // intermediateFacetFilters = {
      //     "facet1": ["value1", "value2"],
      //     "facet2": ["value1"]
      // }
      //
      // Into this:
      // facet1:[value1,value2] && facet2:value1

      adaptedResult = Object.entries(intermediateFacetFilters).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            facet = _ref2[0],
            values = _ref2[1];

        return "".concat(facet, ":[").concat(values.join(","), "]");
      }).join(" && ");
      return adaptedResult;
    }
  }, {
    key: "_adaptNumericFilters",
    value: function _adaptNumericFilters(numericFilters) {
      var adaptedResult = "";

      if (!numericFilters) {
        return adaptedResult;
      }

      adaptedResult = numericFilters.map(function (numericFilter) {
        return numericFilter.replace(new RegExp("(>|<=)"), ":$1");
      }).join(" && ");
      return adaptedResult;
    }
  }, {
    key: "_adaptFilters",
    value: function _adaptFilters(facetFilters, numericFilters) {
      var adaptedFilters = [];
      adaptedFilters.push(this._adaptFacetFilters(facetFilters));
      adaptedFilters.push(this._adaptNumericFilters(numericFilters));
      return adaptedFilters.filter(function (filter) {
        return filter !== "";
      }).join(" && ");
    }
  }, {
    key: "_adaptIndexName",
    value: function _adaptIndexName(indexName) {
      return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[1];
    }
  }, {
    key: "_adaptSortBy",
    value: function _adaptSortBy(indexName) {
      return indexName.match(this.constructor.INDEX_NAME_MATCHING_REGEX)[3];
    }
  }, {
    key: "_buildSearchParameters",
    value: function _buildSearchParameters() {
      var params = this.instantsearchRequest.params;
      var indexName = this.instantsearchRequest.indexName;
      var snakeCasedAdditionalSearchParameters = {};

      for (var _i2 = 0, _Object$entries = Object.entries(this.additionalSearchParameters); _i2 < _Object$entries.length; _i2++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        snakeCasedAdditionalSearchParameters[this._camelToSnakeCase(key)] = value;
      }

      var typesenseSearchParams = Object.assign({}, snakeCasedAdditionalSearchParameters);
      Object.assign(typesenseSearchParams, {
        q: params.query === "" ? "*" : params.query,
        facet_by: [params.facets].flat().join(","),
        filter_by: this._adaptFilters(params.facetFilters, params.numericFilters),
        sort_by: this._adaptSortBy(indexName),
        max_facet_values: params.maxValuesPerFacet,
        page: (params.page || 0) + 1
      });

      if (params.hitsPerPage) {
        typesenseSearchParams.per_page = params.hitsPerPage;
      }

      if (params.facetQuery) {
        typesenseSearchParams.facet_query = "".concat(params.facetName, ":").concat(params.facetQuery);
        typesenseSearchParams.per_page = 0;
      } // console.log(params);
      // console.log(typesenseSearchParams);


      return typesenseSearchParams;
    }
  }, {
    key: "_camelToSnakeCase",
    value: function _camelToSnakeCase(str) {
      return str.split(/(?=[A-Z])/).join("_").toLowerCase();
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.typesenseClient.collections(this._adaptIndexName(this.instantsearchRequest.indexName)).documents().search(this._buildSearchParameters()));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request() {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }]);

  return SearchRequestAdapter;
}();

exports.SearchRequestAdapter = SearchRequestAdapter;