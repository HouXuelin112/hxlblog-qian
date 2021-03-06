import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// 引入markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
