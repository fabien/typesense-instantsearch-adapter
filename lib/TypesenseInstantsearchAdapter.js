(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Configuration", "typesense", "./SearchRequestAdapter", "./SearchResponseAdapter", "./FacetSearchResponseAdapter"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Configuration"), require("typesense"), require("./SearchRequestAdapter"), require("./SearchResponseAdapter"), require("./FacetSearchResponseAdapter"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Configuration, global.typesense, global.SearchRequestAdapter, global.SearchResponseAdapter, global.FacetSearchResponseAdapter);
    global.TypesenseInstantsearchAdapter = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Configuration, _typesense, _SearchRequestAdapter, _SearchResponseAdapter, _FacetSearchResponseAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var TypesenseInstantsearchAdapter = /*#__PURE__*/function () {
    function TypesenseInstantsearchAdapter(options) {
      var _this = this;

      _classCallCheck(this, TypesenseInstantsearchAdapter);

      this.configuration = new _Configuration.Configuration(options);
      this.configuration.validate();
      this.typesenseClient = new _typesense.SearchClient(this.configuration.server);
      this.searchClient = {
        search: function search(instantsearchRequests) {
          return _this.searchTypesenseAndAdapt(instantsearchRequests);
        },
        searchForFacetValues: function searchForFacetValues(instantsearchRequests) {
          return _this.searchTypesenseForFacetValuesAndAdapt(instantsearchRequests);
        }
      };
    }

    _createClass(TypesenseInstantsearchAdapter, [{
      key: "searchTypesenseAndAdapt",
      value: function () {
        var _searchTypesenseAndAdapt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(instantsearchRequests) {
          var _this2 = this;

          var adaptedResponses, results;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return instantsearchRequests.map( /*#__PURE__*/function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(instantsearchRequest) {
                      var typesenseResponse, responseAdapter;
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return _this2._adaptAndPerformTypesenseRequest(instantsearchRequest);

                            case 2:
                              typesenseResponse = _context.sent;
                              responseAdapter = new _SearchResponseAdapter.SearchResponseAdapter(typesenseResponse, instantsearchRequest);
                              return _context.abrupt("return", responseAdapter.adapt());

                            case 5:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x2) {
                      return _ref.apply(this, arguments);
                    };
                  }());

                case 2:
                  adaptedResponses = _context2.sent;
                  _context2.next = 5;
                  return Promise.all(adaptedResponses);

                case 5:
                  results = _context2.sent;
                  return _context2.abrupt("return", {
                    results: results
                  });

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function searchTypesenseAndAdapt(_x) {
          return _searchTypesenseAndAdapt.apply(this, arguments);
        }

        return searchTypesenseAndAdapt;
      }()
    }, {
      key: "searchTypesenseForFacetValuesAndAdapt",
      value: function () {
        var _searchTypesenseForFacetValuesAndAdapt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(instantsearchRequests) {
          var _this3 = this;

          var adaptedResponses, results;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return instantsearchRequests.map( /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(instantsearchRequest) {
                      var typesenseResponse, responseAdapter;
                      return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.next = 2;
                              return _this3._adaptAndPerformTypesenseRequest(instantsearchRequest);

                            case 2:
                              typesenseResponse = _context3.sent;
                              responseAdapter = new _FacetSearchResponseAdapter.FacetSearchResponseAdapter(typesenseResponse, instantsearchRequest);
                              return _context3.abrupt("return", responseAdapter.adapt());

                            case 5:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3);
                    }));

                    return function (_x4) {
                      return _ref2.apply(this, arguments);
                    };
                  }());

                case 2:
                  adaptedResponses = _context4.sent;
                  _context4.next = 5;
                  return Promise.all(adaptedResponses);

                case 5:
                  results = _context4.sent;
                  return _context4.abrupt("return", results);

                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        function searchTypesenseForFacetValuesAndAdapt(_x3) {
          return _searchTypesenseForFacetValuesAndAdapt.apply(this, arguments);
        }

        return searchTypesenseForFacetValuesAndAdapt;
      }()
    }, {
      key: "_adaptAndPerformTypesenseRequest",
      value: function () {
        var _adaptAndPerformTypesenseRequest2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(instantsearchRequest) {
          var requestAdapter, typesenseResponse;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  requestAdapter = new _SearchRequestAdapter.SearchRequestAdapter(instantsearchRequest, this.typesenseClient, this.configuration.additionalSearchParameters);
                  _context5.next = 3;
                  return requestAdapter.request();

                case 3:
                  typesenseResponse = _context5.sent;
                  return _context5.abrupt("return", typesenseResponse);

                case 5:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function _adaptAndPerformTypesenseRequest(_x5) {
          return _adaptAndPerformTypesenseRequest2.apply(this, arguments);
        }

        return _adaptAndPerformTypesenseRequest;
      }()
    }]);

    return TypesenseInstantsearchAdapter;
  }();

  _exports["default"] = TypesenseInstantsearchAdapter;
});