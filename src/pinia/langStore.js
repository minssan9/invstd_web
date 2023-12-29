import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLangStore = defineStore('useLangStore',() => {
  let lang = ref('ko');


  const getlangType = computed(() => lang.value)

  const setLangType = (langType) => lang.value = langType


  return {lang, setLangType, getlangType}
})

export class uselangStore {
}
