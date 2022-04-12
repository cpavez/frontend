import api from "../../config/axios";
const actions = {
  async findQuestionnaireResponseAdmisionByPatientIdentifir(
    { commit },
    payload
  ) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "questionnaireResponse/findQuestionnaireResponseAdmisionByPatientIdentifir/" +
          payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async getQuestionnaireResponse({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest("questionnaireResponse/" + payload);
      return response.data.data;
    } catch (e) {
      return e.response;
    }
  },
  async setQuestionnaireRespoonse({ commit }, payload) {
    try {
      const response = await api.getRequest("questionnaireResponse/" + payload);
      commit("setObjectquestionnaireResponse", response.data.data);
    } catch (e) {
      return e.response;
    }
    commit("setQuestionnaireRespoonse", payload);
  },
  postQuestionnaire({ commit }, payload) {
    console.log(commit);
    void api
      .postRequest("questionnaireResponse", payload)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return error.response;
      });
  },
};

export default actions;
