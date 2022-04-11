const mutations = {
  SET_AUTH_STATE(state, payload) {
    state.authState = payload;
  },
  SET_AUTH_USER(state, payload) {
    state.user = payload;
  },
  SET_ACCESS_TOKEN(state, payload) {
    state.accessToken = payload;
  },
};

export default mutations;
