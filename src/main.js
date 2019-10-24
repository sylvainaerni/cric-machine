import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
Vue.config.productionTip = false;


import VueKonva from "vue-konva";
VueKonva.pixelRatio = 1;
Vue.use(VueKonva);


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
