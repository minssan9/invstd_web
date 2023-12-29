<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <p>{{ $t('message.hello', { user: '사용자' }) }}</p>

      <HelloWorld msg="You did it!" />

      {{ $t("example") }}
      <br>
      {{ web }}
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <p>{{$t('message.bye', ['펭수'])}}</p>
  </header>

  <v-app>
    <v-row>
      <v-btn @click="changeLanguage('ko')">Ko</v-btn>
      <v-btn @click="changeLanguage('en')">En</v-btn>
    </v-row>

    <RouterView />
  </v-app>
</template>

<script>
import {useAppStore} from "./pinia/appStore";

export default {
  name: 'AppVue',
  data() {
    return {
      web: import.meta.env.VITE_APP_WEB,
      username: '',
    }
  },
  computed: {
    // ...mapState(appStore)
  },
  created() {
    let langType = navigator.language
    langType = langType.substring(0, 2)
    if (langType !== 'ko') langType = 'en' // 한국어가 아닌 경우 무조건 영어로 설정

    this.changeLanguage(langType)
  },
  methods:{
    // ...mapActions(appStore),
    changeLanguage(langType){
      const app = useAppStore()
      app.setLangType(langType)
      this.$i18n.locale = langType

    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
