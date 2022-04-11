import api from "../../config/axios";
const actions = {
  setAlergias({ commit }, payload) {
    if (payload != "") {
      void api
        .getRequest("allergyIntolerance/patient/" + payload)
        .then((response) => {
          commit("setAlergias", response.data.data);
        });
    } else {
      commit("setAlergias", []);
    }
  },
};

export default actions;
