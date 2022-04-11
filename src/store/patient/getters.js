const getters ={
    getQuestionnaire(state) {
        return state.questionnaire
    },
    getQuestionnaireAntecedetes(state) {
        return state.questionnaireAntecedentes
    },
    getQuestionnaireExamenFisico(state) {
        return state.questionnaireExamenFisico
    },
    getQuestionnaireInterconsultaDermatologia(state) {
        return state.questionnaireInterconsultaDermatologia
    },
    getQuestionnaireAnexos(state) {
        return state.questionnaireAnexos
    },
    getPatientID(state) {
        return state.patientID
    },
    getObjectPatient(state) {
        return state.objectPatient
    },
    getQuestionnaireResponse(state) {
        return state.questionnaireResponse
    },
    getObjectQuestionnaireResponse(state) {
        return state.objectquestionnaireResponse
    },
    getComposition(state) {
        return state.composition
    },
    getAlergias(state) {
        return state.alergias
    }
}

export default getters
