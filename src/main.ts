import { createApp } from "vue";
import Routes from "./router/index";
import "./style.css";
import App from "./App.vue";

createApp(App).use(Routes).mount("#app");
