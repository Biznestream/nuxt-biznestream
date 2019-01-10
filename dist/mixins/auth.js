define(["exports", "vue", "vue-property-decorator", "nuxt-class-component"], function (_exports, _vue, _vuePropertyDecorator, _nuxtClassComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _vue = _interopRequireDefault(_vue);
  _nuxtClassComponent = _interopRequireWildcard(_nuxtClassComponent);

  var _dec, _dec2, _class, _class2, _descriptor, _temp;

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

  const BIZNESTREAM_NAMESPACE = 'bzstrm';
  const {
    Mutation
  } = (0, _nuxtClassComponent.namespace)(BIZNESTREAM_NAMESPACE);
  let AuthMixin = (_dec = (0, _vuePropertyDecorator.Watch)('searchCompaniesQuery'), _dec2 = (0, _vuePropertyDecorator.Watch)('selectedCompany'), (0, _nuxtClassComponent.default)(_class = (_class2 = (_temp = class AuthMixin extends _vue.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "setCurrentCompanyId", _descriptor, this);

      this.loginError = null;
      this.loginLoading = false;
      this.companiesLoading = false;
      this.searchCompaniesQuery = '';
      this.companies = [];
      this.selectedCompany = null;
    }

    /**
     * Logout method using auth-module with custom post-request
     * logic, using toast module to show information, success
     * and error messages.
     *
     * @returns {Promise<void>}
     */
    async logout() {
      await this.$auth.logout();
      this.$router.push('/auth/signin');
    }
    /**
     * Login method using auth-module with custom post-request
     * logic, using toast module to show information, success
     * and error messages.
     *
     * @returns {Promise<T>}
     */


    async login(data) {
      this.loginLoading = true;
      this.loginError = null;

      try {
        await this.$auth.login({
          data
        });
        this.$router.push('/');
      } catch ({
        response
      }) {
        this.loginError = response.data;
      }

      this.loginLoading = false;
    }

    async onSearchCompaniesQuery(query) {
      if (this.companiesLoading) {
        return;
      }

      this.companiesLoading = true;
      this.companies = await this.$axios.$get('/api/oauth/v1/companies', {
        params: {
          query
        }
      });
      this.companiesLoading = false;
    }

    async onCompanyChange(companyId) {
      if (!companyId) {
        return null;
      }

      this.setCurrentCompanyId(companyId);
      this.$router.push({
        name: 'companyId',
        params: {
          companyId
        }
      });
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "setCurrentCompanyId", [Mutation], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "onSearchCompaniesQuery", [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, "onSearchCompaniesQuery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onCompanyChange", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onCompanyChange"), _class2.prototype)), _class2)) || _class);
  _exports.default = AuthMixin;
});
