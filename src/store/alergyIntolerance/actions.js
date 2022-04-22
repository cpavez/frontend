import api from "../../config/axios";
const actions = {
  setAlergias({ commit }, payload) {
    if (payload != "") {
      void api
        .getRequest("allergyIntolerance/patient/" + payload)
        .then((response) => {
          commit("setAlergias", response.data.data);
        });
    } else {
      commit("setAlergias", []);
    }
  },
  async postAllergy({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.postRequest("allergyIntolerance", payload);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async putResource({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.putRequest(payload.fullUrl, payload.resource);
      return response;
    } catch (e) {
      return e.response;
    }
  },
};

export default actions;
