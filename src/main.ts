import Vue from 'vue'

import './primeVue';

import App from './App.vue'
import router from './router'
import store from './store'
import LoginPlugin from '@/plugins/auth.plugin';
import HttpPlugin from '@/plugins/http.plugin';
import axios from 'axios';

Vue.config.productionTip = false

Vue.use(LoginPlugin);
Vue.use(HttpPlugin, axios);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
