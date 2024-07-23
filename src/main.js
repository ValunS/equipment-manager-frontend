import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Подключение роутера (позже)
import store from "./store"; // Подключение Vuex
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App).use(router).use(store);

// Настройка базового URL для Axios (ваш бэкенд)
axios.defaults.baseURL = "http://localhost:8000/api";

app.mount("#app");
