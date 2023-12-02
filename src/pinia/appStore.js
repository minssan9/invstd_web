import { defineStore } from 'pinia'


export const useAppStore = defineStore('app',{
  state: () => ({
    langType: 'ko',
    id: 0,
  }),
  getters: {
    currentLangType: (state) => state.langType
  },
  actions: {
    setLangType(langType) {
      this.langType = langType
    }
  }
})
