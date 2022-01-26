import App from "./App.vue"
import router from "./router"
import naive from "naive-ui";
import { createApp } from "vue"
import { store, key } from "./store"
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";

createApp(App).use(store, key).use(router).use(naive).mount("#app");