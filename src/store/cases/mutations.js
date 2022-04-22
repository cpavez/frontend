const mutations = {
  setCasesAll(state, payload) {
    state.casesAll = payload;
  },
  setCasesPending(state, payload) {
    state.casesPending = payload;
  },
  setCasesComplete(state, payload) {
    state.casesAll = payload;
  },
};

export default mutations;
