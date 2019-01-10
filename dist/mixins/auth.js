"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuePropertyDecorator = require("vue-property-decorator");

var _nuxtClassComponent = _interopRequireWildcard(require("nuxt-class-component"));

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var BIZNESTREAM_NAMESPACE = 'bzstrm';

var _namespace = (0, _nuxtClassComponent.namespace)(BIZNESTREAM_NAMESPACE),
    Mutation = _namespace.Mutation;

var AuthMixin = (_dec = (0, _vuePropertyDecorator.Watch)('searchCompaniesQuery'), _dec2 = (0, _vuePropertyDecorator.Watch)('selectedCompany'), (0, _nuxtClassComponent.default)(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(AuthMixin, _Vue);

  function AuthMixin() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AuthMixin);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AuthMixin)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "setCurrentCompanyId", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.loginError = null;
    _this.loginLoading = false;
    _this.companiesLoading = false;
    _this.searchCompaniesQuery = '';
    _this.companies = [];
    _this.selectedCompany = null;
    return _this;
  }

  _createClass(AuthMixin, [{
    key: "logout",

    /**
     * Logout method using auth-module with custom post-request
     * logic, using toast module to show information, success
     * and error messages.
     *
     * @returns {Promise<void>}
     */
    value: function () {
      var _logout = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$auth.logout();

              case 2:
                this.$router.push('/auth/signin');

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
    /**
     * Login method using auth-module with custom post-request
     * logic, using toast module to show information, success
     * and error messages.
     *
     * @returns {Promise<T>}
     */

  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loginLoading = true;
                this.loginError = null;
                _context2.prev = 2;
                _context2.next = 5;
                return this.$auth.login({
                  data: data
                });

              case 5:
                this.$router.push('/');
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                response = _context2.t0.response;
                this.loginError = response.data;

              case 12:
                this.loginLoading = false;

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 8]]);
      }));

      function login(_x) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "onSearchCompaniesQuery",
    value: function () {
      var _onSearchCompaniesQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(query) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.companiesLoading) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this.companiesLoading = true;
                _context3.next = 5;
                return this.$axios.$get('/api/oauth/v1/companies', {
                  params: {
                    query: query
                  }
                });

              case 5:
                this.companies = _context3.sent;
                this.companiesLoading = false;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onSearchCompaniesQuery(_x2) {
        return _onSearchCompaniesQuery.apply(this, arguments);
      }

      return onSearchCompaniesQuery;
    }()
  }, {
    key: "onCompanyChange",
    value: function () {
      var _onCompanyChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(companyId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (companyId) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", null);

              case 2:
                this.setCurrentCompanyId(companyId);
                this.$router.push({
                  name: 'companyId',
                  params: {
                    companyId: companyId
                  }
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onCompanyChange(_x3) {
        return _onCompanyChange.apply(this, arguments);
      }

      return onCompanyChange;
    }()
  }]);

  return AuthMixin;
}(_vue.default), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "setCurrentCompanyId", [Mutation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "onSearchCompaniesQuery", [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, "onSearchCompaniesQuery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onCompanyChange", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onCompanyChange"), _class2.prototype)), _class2)) || _class);
exports.default = AuthMixin;
