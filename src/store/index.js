import { createStore } from "vuex";
import observation from "./observation";
import auth from "./auth";
import questionnaire from "./questionnaire";
import questionnaireResponse from "./questionnaireResponse";
import composition from "./composition";
import patient from "./patient";
import alergyIntolerance from "./alergyIntolerance";
import bundle from "./bundle";
import cases from "./cases";
import serviceRequest from "./serviceRequest";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    observation,
    questionnaire,
    questionnaireResponse,
    composition,
    patient,
    alergyIntolerance,
    bundle,
    cases,
    serviceRequest,
    auth,
  },
});
