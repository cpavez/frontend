import api from "../../config/axios";
const actions = {
  async obtenerprompting({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "snomed/obtenerprompting/" + payload
      );
      return response;
    } catch (e) {
      return e.response;
    }
  },
  async obtenercodigotesauro({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "snomed/obtenercodigotesauro/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async obtenerexpresionsnomed({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "snomed/obtenerexpresionsnomed/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async obtenerclasificadorunicoCIE10({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "snomed/obtenerclasificadorunicoCIE10/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async obtenerofertatextos({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "snomed/obtenerofertatextos/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async informardescripcionconsumida({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "snomed/informardescripcionconsumida/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
  async obtenersubsetsxdescid({ commit }, payload) {
    console.log(commit);
    try {
      const response = await api.getRequest(
        "snomed/obtenersubsetsxdescid/" + payload
      );
      return response.data;
    } catch (e) {
      return e.response;
    }
  },
};

export default actions;
