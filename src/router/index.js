import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:"/AnnouncementManagement",
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
    path: '/Register',
    name: '/Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/FaceLogin',
    name: '/FaceLogin',
    component: () => import('@/views/FaceLogin')
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
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
