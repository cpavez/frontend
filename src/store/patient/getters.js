const getters = {
  getPatientID(state) {
    return state.patientID;
  },
  getObjectPatient(state) {
    return state.objectPatient.data;
  },
};

export default getters;
