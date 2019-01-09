export const state = () => ({
  currentCompanyId: null
});

export const mutations = {
  setCurrentCompanyId (state, companyId) {
    state.currentCompanyId = companyId;
  }
};
