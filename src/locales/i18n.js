import {createI18n} from "vue-i18n";
import en from "@/locales/en.json";
import ko from "@/locales/ko.json";



export const i18n = createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: "en",
  messages: { en, ko },
});

