import Vue from 'vue';
import Router from 'vue-router';
import Query from './views/Query.vue';
import Maintenance from './views/Maintenance.vue';
import Builder from './views/BuilderStandard.vue';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
    },
    {
      path: '/maintenance',
      name: 'Maintenance',
      component: Maintenance
    },
    {
      path: '/builder',
      name: 'BuilderStandard',
      component: Builder
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') next();
  if (!store.state.user.isLoggedIn) next('/login');
  else if (!store.state.user.authLocations.includes(to.path)) {
    store.commit('error', { code: 'AUTHERROR' });
    next(from.path);
  } else {
    next();
  }
});

export default router;
