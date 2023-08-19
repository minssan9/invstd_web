import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLangStore = defineStore('useLangStore',() => {
  const lang = ref('ko');


  const getlangType = computed(() => lang.value)

  const setLangType = (langType) => lang = langType


  return {lang, setLangType, getlangType}
})

export class uselangStore {
}
