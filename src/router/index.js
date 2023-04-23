import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:"/UserManagement",
    children:[
      {
        path:'UserManagement',
        name:'UserManagement',
        component: () => import("../views/management/UserManagement"),

      },
      {
        path:'/AnnouncementManagement',
        name:'/AnnouncementManagement',
        component: () =>import('@/views/management/AnnouncementManagement'),
        // meta: { isAuth: true },
      },
      {
        path:'/MessageManagement',
        name:'/MessageManagement',
        component: () =>import('@/views/management/MessageManagement'),
        // meta: { isAuth: true },
      },
      {
        path:'/WorkManagement',
        name:'/WorkManagement',
        component: () =>import('@/views/management/WorkManagement'),
        // meta: { isAuth: true },
      },
      {
        path:'/DormitoryManagement',
        name:'/DormitoryManagement',
        component: () =>import('@/views/management/DormitoryManagement'),
        // meta: { isAuth: true },
      },
      {
        path: '/FeeController',
        name: '/FeeController',
        component: () => import('@/views/management/FeeController'),
        // meta: { isAuth: true },
      },
    ]
  },
  {
    path: '/ManagerLogin',
    name: '/ManagerLogin',
    component: () => import('@/views/management/ManagerLogin'),
    meta: { isAuth: false, title:'管理员登录' },
  },
  {
    path: '/Home',
    name: '/Home',
    component: () => import('@/views/HomeView'),
    meta: { isAuth: true },
  },
  {
    path: '/Login',
    name: '/Login',
    component: () => import('@/views/Login'),
    // meta: { isAuth: true },
  },
  {
    path: '/HandleProposal',
    name: '/HandleProposal',
    component: () => import('@/views/HandleProposal'),
    // meta: { isAuth: true },
  },
  {
    path: '/Register',
    name: '/Register',
    component: () => import('@/views/Register'),
    meta: { isAuth: false, title:'注册' },
  },
  {
    path: '/FaceLogin',
    name: '/FaceLogin',
    component: () => import('@/views/FaceLogin'),
    meta: { isAuth: false, title:'人脸登录' },
  },
  {
    path: '/InfoFulfill',
    name: '/InfoFulfill',
    component: () => import('@/views/InfoFulfill'),
    meta: { isAuth: false, title:'完善信息' },
  },
  {
    path: '/Announcement',
    name: '/Announcement',
    component: () => import('@/views/Announcement'),
    // meta: { isAuth: true },
  },
  {
    path: '/Details',
    name: '/Details',
    component: () => import('@/views/Details'),
    // meta: { isAuth: true },
  },
  {
    path: '/FeeAddress',
    name: '/FeeAddress',
    component: () => import('@/views/FeeAddress'),
    // meta: { isAuth: true },
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login' || to.meta.isAuth) {
//     next();
//   }else {
//     let token = localStorage.getItem('Authorization');
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('Authorization')
  if (to.meta.isAuth && !token) {
    next('/login')
  } else if ((to.name === 'Login' || to.name === 'ManagerLogin' || to.name === 'InfoFulfill') && token) {
    next('/')
  } else {
    next()
  }
})
export default router
