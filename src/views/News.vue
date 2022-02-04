<template>
  <div class="news">
    <!-- Loading Animation -->
    <Loading v-if="loading" />

    <!-- Search -->
    <div class="search">
      <input
        type="text"
        placeholder="Search"
        @keyup.enter="searchArticles"
        v-model.lazy="searchInput"
      />
      <button v-show="searchInput !== ''" @click="clearSearch" class="button">
        Clear Search
      </button>
    </div>

    <!-- News Articles -->
    <div class="results">
      <article v-for="(article, index) in articles" :key="index">
        <img :src="article.urlToImage" alt="Photo unavailable" />
        <div class="info">
          <section v-html="article.title"></section>
          <div class="link" @click="navTo(article.url)">View Article</div>
        </div>
      </article>
    </div>
    <div v-if="results">No Results Found</div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";
import Loading from "../components/Loading.vue";

export default {
  name: "news",
  components: {
    Loading,
  },
  data() {
    return {
      articles: [],
      searchInput: "",
      loading: null,
      results: null,
    };
  },

  created() {
    this.getStoredArticles();
  },

  methods: {
    navTo(url) {
      window.open(url);
    },

    async getArticles() {
      const data = axios.get(
        `https://newsapi.org/v2/top-headlines?country=ng&pageSize=50&apiKey=d0f979965a074eb2afd14c8b3e490301`
      );
      const result = await data;
      console.log(result.data.articles);
      if (result.status == 200) {
        return result.data.articles;
      } else {
        return [];
      }
    },

    async uploadArticles() {
      const batch = db.batch();
      const articles = await this.getArticles();
      articles.forEach((article) => {
        const articleRef = db.collection("articles").doc(); //automatically generate unique id
        batch.set(articleRef, article);
      });
      batch.commit();
    },

    async getStoredArticles() {
      this.loading = true;
      const dataBase = await db.collection("articles");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (doc.exists) {
          const data = {
            url: doc.data().url,
            urlToImage: doc.data().urlToImage,
            title: doc.data().title,
          };
          this.articles.push(data);
          this.results = false;
          this.loading = false;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          this.results = true;
        }
      });
    },

    async searchArticles() {
      this.loading = true;
      
      if (this.searchInput == "") {
        this.clearSearch();
      } else {
        const searchedArticles = [];
        this.articles.map((article) => {
          if (
            article.title.toLowerCase().includes(this.searchInput.toLowerCase())
          ) {
            searchedArticles.push(article);
          } else {
            this.results = true;
          }
        });
        this.articles = [];
        this.articles = searchedArticles;
        this.loading = false;
      }
    },
    
    clearSearch() {
      this.searchInput = "";
      this.articles = [];
      this.getStoredArticles();
    },
  },
};
</script>

<style scoped>
.news {
  background: #80808040;
  min-height: 100vh;
}
.news .search {
  display: flex;
  padding: 32px 16px;
}
.news .search input {
  max-width: 350px;
  width: 100%;
  padding: 12px 6px;
  font-size: 14px;
  border: none;
}
.news .search input:focus {
  outline: none;
}
.news .search .button {
  margin-top: 0;
  border-radius: 0;
}

.results {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
}

@media (min-width: 500px) {
  .results {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 900px) {
  .results {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1200px) {
  .results {
    grid-template-columns: repeat(4, 1fr);
  }
}
.results article {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;
}

.results article:hover {
  transform: rotateZ(-1deg) scale(1.01);
  box-shadow: 0 4px 6px -1px rgba(189, 176, 176, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.results article img {
  display: block;
  border-radius: 8px 8px 0 0;
  z-index: 1;
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.results article .info {
  margin-top: 20px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.info section {
  font-weight: 500;
}

.info .link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
  text-transform: none;
  align-self: flex-end;
}
.info .link:hover {
  color: #006effc9;
}
</style>