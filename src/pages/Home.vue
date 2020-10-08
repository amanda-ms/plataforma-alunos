<template>
  <div class="home container">
    <div class="header">
      <div class="content">
        <img src="@/assets/mdi_search.svg" />
        <input
          type="text"
          placeholder="Pesquise por nome ou skills"
          v-model="q"
        />
      </div>
    </div>

    <div class="home__actions content">
      <h1 class="home__actions__title">Lista de alunos</h1>
      <div class="home__actions__buttons">
        <button
          @click="deletarTodos"
          class="home__actions__buttons__button excluir"
        >
          Excluir
        </button>
        <button @click="modal = true" class="home__actions__buttons__button">
          Novo
        </button>
      </div>
    </div>

    <table class="table content">
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="check" @change="checarTodos" />
          </th>
          <th>Nome</th>
          <th>Email</th>
          <th>Skills</th>
          <th>Adicionado em:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aluno in filterList" :key="aluno.id">
          <td class="table__checkbox">
            <input type="checkbox" v-model="aluno.check" />
          </td>

          <td class="table__name">
            <figure>
              <img :src="aluno.avatar" />
            </figure>
            {{ aluno.name }}
          </td>

          <td class="table__email">{{ aluno.email }}</td>

          <td class="table__skills">
            <div v-for="skill in aluno.skills" :key="skill">
              {{ skill }}
            </div>
          </td>

          <td class="table__date">{{ aluno.date }}</td>
        </tr>
      </tbody>
    </table>
    <Modal
      v-if="modal"
      :close="() => (modal = false)"
      @update="carregarAlunos"
    />
  </div>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Modal";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      alunos: [],
      modal: false,
      check: false,
      q: "",
    };
  },
  components: {
    Modal,
  },
  mounted() {
    this.$store.dispatch("carregarAlunos");
  },
  computed: {
    ...mapGetters(["carregarAlunos"]),

    checar() {
      const arr = [];
      const alunos = this.alunos.filter((aluno) => aluno.check);

      alunos.map((item) => {
        arr.push(item.id);
      });

      return arr;
    },
    filterList() {
      return this.carregarAlunos.filter((aluno) =>
        aluno.name.toLowerCase().match(RegExp(this.q.toLowerCase()))
      );
    },
  },
  methods: {
    checarTodos() {
      const arr = this.alunos;

      arr.map((aluno) => {
        aluno.check = this.check ? true : false;
      });

      this.alunos = arr;
    },
    deletarTodos() {
      this.checar.map((id) => {
        this.deletarAluno(id);
      });
    },
    async deletarAluno(id) {
      const { data } = await axios.delete(`http://localhost:3000/alunos/${id}`);

      this.carregarAlunos();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 85%;
  margin: 0 7.5%;
}

.container {
  width: 100%;
  height: 100%;
}

.home {
  display: flex;
  flex-direction: column;
  background: #e5e5e5;
  .header {
    background: #fff;
    height: 60px;
    display: flex;
    align-items: center;
    .content {
      display: flex;
      input {
        height: auto;
        padding: 10px;
        border: 0;
        outline: 0;
        width: 30%;
        font-size: 12px;
        font-family: Poppins, sans-serif;
        &::placeholder {
          color: #90a0b7;
        }
      }
    }
  }
  &__actions {
    padding: 41px 0 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__title {
      font-size: 20px;
      color: #109cf1;
      font-weight: 500;
    }
    &__buttons {
      &__button {
        width: 160px;
        height: 42px;
        border: 0;
        background: #109cf1;
        color: #fff;
        border-radius: 4px;
        margin-left: 12px;
        font-weight: 500;
        font-size: 13px;
        cursor: pointer;
        transition: 400ms;
        &:hover {
          background: rgb(0, 125, 202);
        }
      }
      .excluir {
        background: #eb2a00;
        transition: 400ms;
        &:hover {
          background: #b82200;
        }
      }
    }
  }
  .table {
    width: 85%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.06);
    border-collapse: collapse;
    &__checkbox {
      width: 3%;
    }
    &__name {
      display: flex;
      align-items: center;
      figure {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    &__skills {
      display: flex;
      align-items: center;
      div {
        padding: 5px 15px;
        border: 1px solid #109cf1;
        margin-right: 15px;
        border-radius: 4px;
        color: #109cf1;
        font-weight: 500;
      }
    }
    thead {
      tr {
        color: #334d6e;
        th {
          padding: 10px;
          border-bottom: 1px solid #ebeff2;
          text-align: left;
        }
      }
    }

    tbody {
      tr {
        border-top: 1px solid #ebeff2;
        td {
          padding: 10px;
          text-align: left;
        }
      }
    }
  }
}
</style>
