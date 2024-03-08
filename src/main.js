import Vue from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.component("font-awesome-icon", FontAwesomeIcon);
new Vue({
  render: (h) => h(App)
}).$mount("#app");
