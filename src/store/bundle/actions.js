import api from "../../config/axios";
const actions = {
  async postBundle({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.postRequest("/bundle", payload);
      return response;
    } catch (e) {
      return e.response;
    }
  },
};

export default actions;
