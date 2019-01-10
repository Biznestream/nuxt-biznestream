var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import Component, { namespace } from 'nuxt-class-component';
const BIZNESTREAM_NAMESPACE = 'bzstrm';
const {
  Mutation
} = namespace(BIZNESTREAM_NAMESPACE);
let AuthMixin = (_dec = Watch('searchCompaniesQuery'), _dec2 = Watch('selectedCompany'), Component(_class = (_class2 = (_temp = class AuthMixin extends Vue {
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
export { AuthMixin as default };
