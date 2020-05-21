import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

Vue.prototype.$api = axios.create({
  baseURL: `http://localhost:8000/api/`
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
