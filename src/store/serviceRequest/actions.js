import api from "../../config/axios";
const actions = {
  async getServiceRequest({ commit }, payload) {
    if (payload != "") {
      try {
        const response = await api.getRequest("serviceRequest/" + payload);
        commit("setServiceRequest", response.data.data);
        return response.data.data;
      } catch (e) {
        return e.response;
      }
    } else {
      commit("setServiceRequest", []);
      return [];
    }
  },
};

export default actions;
