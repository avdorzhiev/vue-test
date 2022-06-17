import Vue from 'vue'

import './primeVue';

import App from './App.vue'
import router from './router'
import store from './store'
import LoginPlugin from '@/plugins/auth.plugin';

Vue.config.productionTip = false

Vue.use(LoginPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
