import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login/LoginView.vue';
import MainView from '@/views/Main/MainView.vue';
import {commonNameRoutesEnum, loggedNameRoutesEnum, notLoggedNameRoutesEnum} from '@/router/enums';

import ProfileView from '@/views/Main/Profile/ProfileView.vue';
import {AuthService} from '@/plugins/auth.plugin';
import CurrencyView from '@/views/Main/Currency/CurrencyView.vue';

Vue.use(VueRouter)

type allNameRoutesType = commonNameRoutesEnum | notLoggedNameRoutesEnum | loggedNameRoutesEnum;

type myRouteConfig = {name: allNameRoutesType} & RouteConfig;

const routes: Array<myRouteConfig> = [
  {
    path: '/',
    name: commonNameRoutesEnum.home,
    component: HomeView
  },
  {
    path: '/about',
    name: commonNameRoutesEnum.about,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: notLoggedNameRoutesEnum.login,
    component: LoginView,
    beforeEnter(to, from, next) {
      if (AuthService.isLogin()) {
        next({name: loggedNameRoutesEnum.main});
      } else {
        next();
      }
    }
  },
  {
    path: '/main',
    name: loggedNameRoutesEnum.main,
    component: MainView,
    beforeEnter(to, from, next) {
      if (!AuthService.isLogin()) {
        next({name: notLoggedNameRoutesEnum.login});
      } else {
        next();
      }
    },
    children: [
      {
        path: 'profile',
        name: loggedNameRoutesEnum.profile,
        component: ProfileView
      },
      {
        path: 'currency',
        name: loggedNameRoutesEnum.currency,
        component: CurrencyView
      },
    ]
  },
  {
    path: '*',
    name: commonNameRoutesEnum.notFound,
    component: () => import('../views/NotFoundView.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
