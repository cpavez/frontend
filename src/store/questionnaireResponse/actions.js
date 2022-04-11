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
  setQuestionnaireExamenFisico({ commit }, payload) {
    void api.get("Questionnaire/" + payload).then((response) => {
      commit("setQuestionnaireExamenFisico", response.data);
    });
  },
  async setComposition({ commit }, payload) {
    try {
      const response = await api.get("Composition/" + payload);
      commit("setComposition", response.data);
    } catch (e) {
      commit("setComposition", []);
    }
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
  setAlergias({ commit }, payload) {
    if (payload != "") {
      void api.get("AllergyIntolerance/" + payload).then((response) => {
        commit("setAlergias", response.data);
      });
    } else {
      commit("setAlergias", []);
    }
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
  async getComposition({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.get("Composition?" + payload);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async getObservation({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.get("Observation?" + payload);
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
      const response = await api.post("", payload);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async putResource({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.put(payload.fullUrl, payload.resource);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async postAllergy({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.post("AllergyIntolerance", payload);
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async setPatientID({ commit }, payload) {
    try {
      const response = await api.get(payload);
      commit("setObjectPatient", response.data);
    } catch (e) {
      return e.response;
    }
    commit("setPatientID", payload);
  },
  async setQuestionnaireRespoonse({ commit }, payload) {
    try {
      const response = await api.get(payload);
      commit("setObjectquestionnaireResponse", response.data);
    } catch (e) {
      return e.response;
    }
    commit("setQuestionnaireRespoonse", payload);
  },
};

export default actions;
