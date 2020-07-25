// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from '../node_modules/vue-router';
import routes from './router';
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'
import store from './store/index';

Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(element);

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
