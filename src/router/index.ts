import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory
} from 'vue-router'
// 1. Define route components.
// These can be imported from other files
import NProgress from "../plugins/progress";
import { storageSession } from "../utils/storage";
// import i18n from "../plugins/i18n";


const UserLayout = () => import('/@/layouts/UserLayout/index.vue');

const BasicLayout = () => import('/@/layouts/BasicLayout/index.vue');

const BlankLayout = () => import('/@/layouts/BlankLayout/index.vue');
const MainLayout = () => import('/@/layouts/MainLayout/index.vue');

const Home = () => import('/@/pages/Home/index.vue');

const MenuList = [
  {
    path: '',
    name: 'Home',
    component: Home,
    meta: {
      title: 'menu.home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About/index.vue'),
    meta: {
      title: 'menu.about'
    }
  },
]
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login/index.vue'),
    meta: {
      title: 'menu.login'
    }
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: MainLayout,
        children: MenuList,
      },
    ]
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)*',
    component: () => import('/@/pages/Exception/404/index.vue'),
    meta: {
      title: 'menu.404'
    }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const name = storageSession.getItem("info");
  NProgress.start();
  // const { t } = i18n.global;
  console.log(to)
  // to.meta.title ? (document.title = t(to.meta.title)) : ""; // 动态title
  if(name) {
    if(_from?.name) {
      next();
    } else {
      router.push(to.path).then(r => console.log(r));
      next();
    }
  } else {
    // if (to.path !== "/login") {
    //   next({ path: "/login" });
    // } else {
    next();
    // }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router

