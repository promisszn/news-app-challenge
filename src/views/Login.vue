<template>
  <div class="form-wrap">
    <Loading v-if="loading" />
    <form class="login">
      <h2>Log in</h2>
      <button class="google-login">
        <i class="fab fa-google"></i>Log in with Google
      </button>
      <div class="line"></div>
      <div class="inputs">
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
        <div class="error" v-show="error">{{ this.errorMsg.substr(10) }}</div>
      </div>

      <button class="login-button" @click.prevent="login">Log in</button>

      <router-link class="forgot-password" to="#"
        >Forgot Password?</router-link
      >
      <div class="line"></div>

      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'SignUp' }"
          >Sign up</router-link
        >
      </p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Loading from '../components/Loading.vue'

export default {
  name: "login",
  components: {
    Loading,
  },
  data() {
    return {
      email: null,
      password: null,
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
    login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "News" });
          this.error = false;
          this.errorMsg = "";
          console.log(firebase.auth().currentUser.uid);
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.errorMsg = err.message;
        });
    },
  },
};
</script>

<style>
.form-wrap {
  background: #80808040;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrap form {
  background: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 400px;
  color: #303030;
}

.form-wrap h2 {
  text-align: left;
  font-size: 32px;
  color: #303030;
  margin-bottom: 5px;
}

.form-wrap .google-login {
  background: #fff;
  color: #303030;
  border: 1px solid #80808040;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
}

.fa-google {
  padding-right: 10px;
  filter: invert(70%);
}

.line {
  border-bottom: 1px solid #80808040;
  margin: 30px 0;
}

.input {
  position: relative;
}

.input label {
  display: block;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
}

.input input {
  width: 100%;
  padding: 4px 4px 4px 30px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #80808040;
  margin-bottom: 15px;
  outline: none;
}

.input input:focus {
  outline: 1px solid #006effc9;
}

.fa-eye {
  filter: invert(70%);
  position: absolute;
  right: 20px;
  bottom: 30px;
  cursor: pointer;
}

.login-button {
  background: #006effc9;
  color: #fff;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
}

.login-button:hover {
  opacity: 0.7;
}

.forgot-password {
  color: #006effc9;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  margin-top: 20px;
}

.login-register {
  text-align: center;
  font-weight: 600;
  color: #303030;
}

.login-register .router-link {
  display: block;
  color: #006effc9;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
}
</style>