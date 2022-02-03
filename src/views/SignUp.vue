<template>
  <div class="form-wrap">
    <Loading v-if="loading" />
    <form class="signup">
      <h2>Sign up</h2>
      <button class="google-login">
        <i class="fab fa-google"></i>Sign up with Google
      </button>
      <div class="line"></div>
      <div class="inputs">
        <div class="input">
          <label for="Email">Name</label>
          <input type="text" name="Name" placeholder="Name" v-model="name" />
        </div>
        <div class="input">
          <label for="Email">Email</label>
          <input type="text" name="Email" placeholder="Email" v-model="email" />
        </div>
        <div class="input">
          <label for="Password">Password</label>
          <input
            :type="passwordFieldType"
            name="Password"
            placeholder="Password"
            v-model="password"
          />
          <i @click="showPassword" class="fas fa-eye"></i>
        </div>
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
      </div>

      <button class="login-button" @click.prevent="register">Sign up</button>
      <div class="line"></div>

      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Log in</router-link
        >
      </p>
    </form>
  </div>
</template>

<script>
// import firebase from "firebase/app";
// import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from "../firebase/firebaseInit";
import Loading from '../components/Loading.vue'

export default {
  name: "signup",
  components: {
    Loading
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordFieldType: 'password',
      error: '',
      errorMsg: '',
      loading: null,
    };
  },
  methods: {
    showPassword() {
      if (this.passwordFieldType === 'password') {
        this.passwordFieldType = 'text';
      } else {
        this.passwordFieldType = 'password';
      }
    },
    async register() {
      // this.loading = true;
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.name !== ""
      ) {
        this.loading = true;
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          name: this.name,
          email: this.email,
        });
        this.loading = false;
        this.$router.push({ name: "News" });
        return;
      }
      this.loading = false;
      this.error = true;
      this.errorMsg = "Please fill out all the fields";
      return;
    },
  }
};
</script>

<style scoped>
.signup {
  margin-top: 20px;
}
</style>