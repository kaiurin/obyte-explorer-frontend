import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createHead } from "@vueuse/head";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import { createRouter } from "./router";
import { socketIoPlugin } from "./plugins/socket.io";
import "./index.css";

import en from "./locales/en.json";
import dk from "./locales/dk.json";
import cn from "./locales/cn.json";

const redirectAssetList = {
  MBYTE: "GBYTE",
  KBYTE: "GBYTE",
  byte: "GBYTE",
  blackbytes: "GBB",
};

const head = createHead();

const messages = {
  en,
  dk,
  cn,
};

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_LANG,
  fallbackLocale: "en",
  messages,
});

export const createApp = () => {
  const app = createSSRApp(App);

  app.use(socketIoPlugin);
  app.use(autoAnimatePlugin);
  app.use(head);
  app.use(i18n);

  const pinia = createPinia();

  app.use(pinia);

  const router = createRouter();

  router.beforeEach((to, from, next) => {
    if (to.name === "asset") {
      if (!to.params.asset) {
        return next({ name: "home" });
      }

      if (redirectAssetList[to.params.asset]) {
        const asset = redirectAssetList[to.params.asset];
        return next({ name: "asset", params: { asset } });
      }
    }

    next();
  });

  app.use(router);

  return { app, router };
};
