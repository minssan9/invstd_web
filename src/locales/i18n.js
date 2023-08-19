import {createI18n} from "vue-i18n";
import en from "@/locales/en.json";
import ko from "@/locales/ko.json";
import {uselangStore} from "../stores/langStore";

export const i18n = createI18n({
  locale: uselangStore.getlangType,
  fallbackLocale: "en",
  messages: { en, ko },
});

const loadedLanguages = ["ko", "en"];

export function loadLanaguageAsync(lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(lang);
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve();
  }
}
