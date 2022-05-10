import api from "../../config/axios";
const actions = {
  async getObservation({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest("observation/" + payload);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async getObservationsSocialHistoryByPatient({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "observation/social_history/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async getObservationsSignosVitalesByPatient({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "observation/signos_vitales/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async getObservationsWeigthHistoryByPatient({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "observation/weight_history/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
};

export default actions;
