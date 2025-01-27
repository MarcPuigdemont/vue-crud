import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS, HEAD';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
