import http from "../../config/axios";
import { Cookies } from "quasar";
import router from "../../router";
const actions = {
  handleSetAuthState: async ({ commit }, payload) => {
    commit("SET_AUTH_STATE", payload);
  },

  handleSetUser: async ({ commit }, payload) => {
    try {
      http.setToken(payload);
      const response = await http.getRequest("/auth/me", "");
      commit("SET_AUTH_USER", response.data.data);
    } catch (e) {
      commit("SET_AUTH_USER", "");
      Cookies.remove("userLogged");
      await router.push({ name: "login" });
    }
  },

  handleSetAccessToken: async ({ commit }, payload) => {
    try {
      const response = await http.postRequest("/auth/login", payload);
      Cookies.set("userLogged", response.data.data.access_token, {
        secure: true,
      });
      commit("SET_ACCESS_TOKEN", response.data.data.access_token);
      http.setToken(response.data.data.access_token);
      return response;
    } catch (e) {
      commit("SET_ACCESS_TOKEN", "");
      http.setToken("");
      return e.response;
    }
  },
};

export default actions;
