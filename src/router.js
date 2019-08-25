import Vue from 'vue';
import Router from 'vue-router';
import Airlines from './views/Airlines.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'airlines',
      component: Airlines,
    },
  ],
});
