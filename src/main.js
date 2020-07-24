// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import routes from './router';
import store from './store/index';

Vue.config.productionTip = false;
Vue.use(Router);

const router = new Router({
  // base:env.base_build_path,
  // mode: 'history',
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>'
});
