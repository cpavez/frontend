import api from "../../config/axios";
const actions = {
  async setComposition({ commit }, payload) {
    try {
      const response = await api.getRequest("composition/" + payload);
      commit("setComposition", response.data.data);
    } catch (e) {
      commit("setComposition", []);
    }
  },
  async getComposition({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest("composition/" + payload);
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async getCompositionByPatient({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest("composition/patient/" + payload);
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
};

export default actions;
