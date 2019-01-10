import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import Component, { namespace } from 'nuxt-class-component';

const BIZNESTREAM_NAMESPACE = 'bzstrm';

const { Mutation } = namespace(BIZNESTREAM_NAMESPACE);

export default @Component
class AuthMixin extends Vue {
  @Mutation setCurrentCompanyId;

  loginError = null;

  loginLoading = false;

  companiesLoading = false;

  searchCompaniesQuery = '';

  companies = [];

  selectedCompany = null;

  /**
   * Logout method using auth-module with custom post-request
   * logic, using toast module to show information, success
   * and error messages.
   *
   * @returns {Promise<void>}
   */
  async logout () {
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
  async login (data) {
    this.loginLoading = true;
    this.loginError = null;

    try {
      await this.$auth.login({ data });

      this.$router.push('/');
    } catch ({ response }) {
      this.loginError = response.data;
    }
    this.loginLoading = false;
  }

  @Watch('searchCompaniesQuery')
  async onSearchCompaniesQuery (query) {
    if (this.companiesLoading) {
      return;
    }
    this.companiesLoading = true;
    this.companies = await this.$axios.$get('/api/oauth/v1/companies', { params: { query } });
    this.companiesLoading = false;
  }

  @Watch('selectedCompany')
  async onCompanyChange (companyId) {
    if (!companyId) {
      return null;
    }
    this.setCurrentCompanyId(companyId);
    this.$router.push({ name: 'companyId', params: { companyId } });
  }
}
