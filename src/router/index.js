import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:"/login",
    children:[
      {
        path:'UserManagement',
        name:'UserManagement',
        component: () => import("../views/management/UserManagement"),
      },
      {
        path:'/AnnouncementManagement',
        name:'/AnnouncementManagement',
        component: () =>import('@/views/management/AnnouncementManagement')
      },
      {
        path:'/MessageManagement',
        name:'/MessageManagement',
        component: () =>import('@/views/management/MessageManagement')
      },
      {
        path:'/ChartManagement',
        name:'/ChartManagement',
        component: () =>import('@/views/management/ChartManagement')
      },
      {
        path: '/FeeController',
        name: '/FeeController',
        component: () => import('@/views/management/FeeController')
      },
    ]
  },
  {
    path: '/Home',
    name: '/Home',
    component: () => import('@/views/HomeView')
  },
  {
    path: '/Login',
    name: '/Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/HandleProposal',
    name: '/HandleProposal',
    component: () => import('@/views/HandleProposal')
  },
  {
    path: '/Register',
    name: '/Register',
    component: () => import('@/views/Register'),
    meta: { isAuth: true, title:'注册' },
  },
  {
    path: '/FaceLogin',
    name: '/FaceLogin',
    component: () => import('@/views/FaceLogin'),
    meta: { isAuth: true, title:'人脸登录' },
  },
  {
    path: '/InfoFulfill',
    name: '/InfoFulfill',
    component: () => import('@/views/InfoFulfill'),
    meta: { isAuth: true, title:'完善信息' },
  },
  {
    path: '/Announcement',
    name: '/Announcement',
    component: () => import('@/views/Announcement')
  },
  {
    path: '/Details',
    name: '/Details',
    component: () => import('@/views/Details')
  },
  {
    path: '/FeeAddress',
    name: '/FeeAddress',
    component: () => import('@/views/FeeAddress')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.meta.isAuth) {
    next();
  }else {
    let token = localStorage.getItem('Authorization');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
