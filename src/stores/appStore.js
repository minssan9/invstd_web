import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const appStore = defineStore('app',{
  state: () => ({
    langType: 'ko',
    id: 0,
  }),
  getters: {
    getlangType: (state) => state.langType
  },
  actions: {
    setLangType(langType) {
      this.langType = langType
    }
  }
})
