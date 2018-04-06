import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Region from '@/components/Region';
import Widget from '@/components/Widget';
import About from '@/components/About';
import WesternAus from '@/components/WesternAus';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/wa',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/regions/:region',
      props: true,
      name: 'regions',
      component: Region,
    },
    {
      path: '/widget/:size',
      props: true,
      name: 'widget',
      component: Widget,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/wa',
      name: 'wa',
      component: WesternAus,
    },
  ],
});
