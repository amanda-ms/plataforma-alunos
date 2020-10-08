import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alunos: [],
  },
  mutations: {
    carregarAlunos(state, alunos) {
      state.alunos = alunos;
    },
  },
  actions: {
    async carregarAlunos({ commit }) {
      const { data } = await axios.get("http://localhost:3000/alunos");

      data.map((aluno) => {
        aluno.check = false;
      });

      commit("carregarAlunos", data);
    },
  },
  getters: {
    carregarAlunos: (state) => state.alunos,
  },
});
