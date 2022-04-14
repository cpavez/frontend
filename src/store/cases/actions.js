import api from "../../config/axios";
const actions = {
  async setCasesAll({ commit }, payload) {
    if (payload != "") {
      try {
        const response = await api.getRequest("case/category/all/" + payload);
        commit("setCasesAll", response.data.data);
        return response.data.data;
      } catch (e) {
        return e.response;
      }
    } else {
      commit("setCasesAll", []);
      return [];
    }
  },
  async setCasesPending({ commit }, payload) {
    if (payload != "") {
      try {
        const response = await api.getRequest(
          "case/category/pending/" + payload
        );
        commit("setCasesPending", response.data.data);
        return response.data.data;
      } catch (e) {
        return e.response;
      }
    } else {
      commit("setCasesPending", []);
      return [];
    }
  },
  async setCasesComplete({ commit }, payload) {
    if (payload != "") {
      try {
        const response = await api.getRequest(
          "case/category/complete/" + payload
        );
        commit("setCasesComplete", response.data.data);
        return response.data.data;
      } catch (e) {
        return e.response;
      }
    } else {
      commit("setCasesComplete", []);
      return [];
    }
  },
};

export default actions;
