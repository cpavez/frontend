const getters = {
  getCasesAll(state) {
    return state.casesAll;
  },
  getCasesPending(state) {
    return state.casesPending;
  },
  getCasesComplete(state) {
    return state.casesComplete;
  },
};

export default getters;
