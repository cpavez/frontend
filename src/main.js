// FILE: main.js

import { createApp } from "vue";
import { Quasar, Notify, Loading, Cookies } from "quasar";
import quasarLang from "quasar/lang/es";
import router from "./router";
import store from "./store";
import i18n from "./config/i18n";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";

// Import Quasar css
import "quasar/dist/quasar.css";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

const myApp = createApp(App);

myApp
  .use(Quasar, {
    plugins: { Notify, Loading, Cookies }, // import Quasar plugins and add here
    lang: quasarLang,
  })
  .use(store)
  .use(router)
  .use(i18n);

myApp.config.performance = true;
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
