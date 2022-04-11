const mutations = {
    setQuestionnaire(state, payload) {
        state.questionnaire = payload;
    },
    setQuestionnaireExamenFisico(state, payload) {
        state.questionnaireExamenFisico = payload;
    },
    setQuestionnaireAntecedentes(state, payload) {
        state.questionnaireAntecedentes = payload;
    },
    setQuestionnaireInterconsultaDermatologia(state, payload) {
        state.questionnaireInterconsultaDermatologia = payload;
    },
    setQuestionnaireAnexos(state, payload) {
        state.questionnaireAnexos = payload;
    },
    setPatientID(state, payload) {
        state.patientID = payload;
    },
    setObjectPatient(state, payload) {
        state.objectPatient = payload;
    },
    setQuestionnaireRespoonse(state, payload) {
        state.questionnaireResponse = payload;
    },
    setObjectquestionnaireResponse(state, payload) {
        state.objectquestionnaireResponse = payload;
    },
    setComposition(state, payload) {
        state.composition = payload;
    },
    setAlergias(state, payload) {
        state.alergias = payload;
    }
}

export default mutations
