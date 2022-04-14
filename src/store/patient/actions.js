import api from "../../config/axios";
const actions = {
  postPatient({ commit }, payload) {
    console.log(commit);
    void api
      .post("Patient", payload)
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
  async postBundle({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.postRequest("patients", payload);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async setPatientID({ commit }, payload) {
    try {
      const response = await api.getRequest("patients/" + payload);
      commit("setObjectPatient", response.data);
    } catch (e) {
      return e.response;
    }
    commit("setPatientID", payload);
  },
};

export default actions;
