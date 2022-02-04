<template>
  <div id="app-wrapper">
    <div class="app">
      <Navigation v-if="!navigation"/>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'app',
  components: {
    Navigation,
  },
  data() {
    return {
      navigation: null,
    }
  },
  created() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if(this.$route.name === 'Login' || this.$route.name === 'SignUp') {
        this.navigation = true;
        return;   
      }
      this.navigation = false; 
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
}

.error {
  text-align: center;
  font-size: 13px;
  color: red;
}
</style>
