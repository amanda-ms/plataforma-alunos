<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__content__header">
        <h3>Cadastrar novo aluno</h3>
        <button @click="close">Fechar</button>
      </div>

      <figure>
        <img v-if="avatarExiste" :src="avatar" />
      </figure>

      <form @submit="adicionarAluno" class="form">
        <input
          type="text"
          placeholder="Nome"
          v-model="name"
          class="form__input"
        />
        <input
          type="text"
          placeholder="Email"
          v-model="email"
          class="form__input"
        />
        <input
          type="text"
          placeholder="Digite as skills separadas por ','"
          v-model="skills"
          class="form__input"
        />
        <input
          type="text"
          placeholder="Digite a url da foto"
          v-model="avatar"
          class="form__input"
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      skills: "",
      avatar: "",
    };
  },
  props: {
    close: Function,
  },
  computed: {
    avatarExiste() {
      return this.avatar.length > 0;
    },
  },
  methods: {
    async adicionarAluno(e) {
      e.preventDefault();
      const { name, email, skills, avatar } = this;
      const { data } = await axios.post("http://localhost:3000/alunos", {
        name,
        email,
        skills: skills.split(","),
        avatar,
        date: new Date().toLocaleString("pt-br").split(" ")[0],
      });
      this.close();
      this.$emit("update");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    padding: 10px;
    width: 500px;
    background: #fff;
    &__header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ebeff2;
      justify-content: space-between;
      padding: 0 10px 10px;
      h3 {
        font-size: 18px;
        font-weight: normal;
        margin: 0;
      }
      button {
        background: rgb(167, 45, 45);
        width: 50px;
        border: 0;
        outline: 0;
        height: 25px;
      }
    }
    figure {
      width: 100px;
      height: 100px;
      background: #c4c4c4;
      border-radius: 50%;
      overflow: hidden;
      margin: 20px auto 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .form {
      display: flex;
      flex-wrap: wrap;
      padding: 20px 24px;
      &__input {
        padding: 15px;
        width: calc(43% - 3px);
        margin-bottom: 10px;
        border: 1px solid rgba(25, 25, 25, 0.32);
        outline: 0;
        &:nth-child(1) {
          margin-right: 5px;
        }
        &:nth-child(3) {
          width: 100%;
        }
        &:nth-child(4) {
          width: 100%;
        }
      }
      button {
        width: 130px;
        height: 42px;
        border: 0;
        background: #109cf1;
        color: #fff;
        border-radius: 4px;
      }
    }
  }
}
</style>
