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
    void api.get("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireExamenFisico", response.data);
    });
  },
  setQuestionnaireAntecedentes({ commit }, payload) {
    void api.get("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireAntecedentes", response.data);
    });
  },
  setQuestionnaireInterconsultaDermatologia({ commit }, payload) {
    void api.get("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireInterconsultaDermatologia", response.data);
    });
  },
  setQuestionnaireAnexos({ commit }, payload) {
    void api.get("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireAnexos", response.data);
    });
  },
  async getQuestionnaireForm({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.get("Questionnaire/" + payload);
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async getQuestionnaireResponse({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.get(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  postQuestionnaire({ commit }, payload) {
    console.log(commit);
    void api
      .post("QuestionnaireResponse", payload)
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
};

export default actions;
