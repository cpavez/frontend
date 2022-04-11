const getters = {
  getAuthState(state) {
    return state.authState;
  },
  getAccessToken(state) {
    return state.accessToken;
  },
  getUser(state) {
    return state.user;
  },
};

export default getters;
