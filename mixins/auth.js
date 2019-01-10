const BIZNESTREAM_NAMESPACE = 'bzstrm';

export default {
  data: () => {
    return {
      loginError: null,

      loginLoading: false,

      companiesLoading: false,

      searchCompaniesQuery: '',

      companies: [],

      selectedCompany: null
    };
  },

  methods: {
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
    },

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
  },
  watch: {
    async searchCompaniesQuery (query) {
      if (this.companiesLoading) {
        return;
      }
      this.companiesLoading = true;
      this.companies = await this.$axios.$get('/api/oauth/v1/companies', { params: { query } });
      this.companiesLoading = false;
    },
    async selectedCompany (companyId) {
      if (!companyId) {
        return null;
      }
      console.info(this.$store);
      this.$store.commit(`${BIZNESTREAM_NAMESPACE}/setCurrentCompanyId`, companyId);
      this.$router.push({ name: 'companyId', params: { companyId } });
    }
  }
};
