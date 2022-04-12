import api from "../../config/axios";
const actions = {
  getQuestionnaire({ commit }, payload) {
    void api.getRequest("questionnaire/" + payload).then((response) => {
      commit("setQuestionnaire", response.data.data);
    });
  },
  getQuestionnaireAdmision({ commit }, payload) {
    void api.getRequest("questionnaire/admision").then((response) => {
      commit("setQuestionnaire", response.data.data);
    });
  },
  setQuestionnaireExamenFisico({ commit }, payload) {
    void api.getRequest("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireExamenFisico", response.data.data);
    });
  },
  setQuestionnaireAntecedentes({ commit }, payload) {
    void api.getRequest("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireAntecedentes", response.data.data);
    });
  },
  setQuestionnaireInterconsultaDermatologia({ commit }, payload) {
    void api.getRequest("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireInterconsultaDermatologia", response.data.data);
    });
  },
  setQuestionnaireAnexos({ commit }, payload) {
    void api.getRequest("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireAnexos", response.data.data);
    });
  },
  async getQuestionnaireForm({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest("Questionnaire/" + payload);
      return response.data.data;
    } catch (e) {
      return e.response;
    }
  },
  async getQuestionnaireResponse({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest("questionnaire/" + payload);
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
};

export default actions;
