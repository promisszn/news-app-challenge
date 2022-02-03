<template>
  <header>
    <nav class="container">
      <div class="branding">NewsApp</div>
      <div class="nav-links">
        <ul>
          <router-link class="link" :to="{ name: 'Login' }"
          >Sign Out</router-link
        >
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  name: "navigation",
  methods: {
  },
};
</script>

<style scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}
header .link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
}
header .link:hover {
  color: #006effc9;
}
header nav {
  display: flex;
  padding: 25px 0;
}
header nav .branding {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
}
header nav .nav-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}
</style>