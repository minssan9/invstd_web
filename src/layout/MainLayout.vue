<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/layout/NavBar.vue'
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          v-if="!drawer"
          @click="drawer = !drawer"
          icon="menu"
        />
        <q-toolbar-title>
          My Quasar App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>


    <!-- Drawer -->
    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
    >
      <NavBar>
        <q-list>
          <q-item clickable to="/home">
            <q-item-section >Home</q-item-section>
          </q-item>
          <q-item clickable to="/welcome">
            <q-item-section>Welcome</q-item-section>
          </q-item>
          <q-item clickable to="/subscribe">
            <q-item-section>Subscribe</q-item-section>
          </q-item>
          <q-item clickable to="/about">
            <q-item-section>About</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn @click="changeLanguage('ko')">Ko</q-btn>
              <q-btn @click="changeLanguage('en')">En</q-btn>
            </q-item-section>
          </q-item>

          <!-- Add more menu items as needed -->
          <q-item clickable to="/login">
            <q-item-section>Login</q-item-section>
          </q-item>
        </q-list>
      </NavBar>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>

      <transition name="fade" mode="out-in"  >

<!--&lt;!&ndash;        <keep-alive :include="$store.getters.getCachedPages">&ndash;&gt;-->
<!--          <router-view :key="key" v-slot="{ Component }">-->
<!--            <component ref="page" :is="Component" :key="$route.fullPath"/>-->
<!--          </router-view>-->
<!--&lt;!&ndash;        </keep-alive>&ndash;&gt;-->
        <router-view></router-view>
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>
import {useAppStore} from "@/pinia/appStore";

export default {
  name: 'MainLayout',
  data() {
    return {
      web: import.meta.env.VITE_APP_WEB,
      tab: [],
      drawer: false,
    }
  },
  computed: {
    key() {
      return this.$route.name
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);

    let langType = navigator.language.substring(0, 2)
    if (langType !== 'ko') langType = 'en' // 한국어가 아닌 경우 무조건 영어로 설정
    this.changeLanguage(langType)
  },
  mounted() {
  },
  methods:{
    // ...mapActions(appStore),
    changeLanguage(langType){
      const app = useAppStore()
      app.setLangType(langType)
      this.$i18n.locale = langType

    },

    handleResize() {
      this.resizeWidth()
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  }
}
</script>