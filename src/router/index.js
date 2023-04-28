import {createRouter, createWebHistory} from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path:'/admin',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:'/UserManagement',
        name:'/UserManagement',
        component: () => import("@/views/management/UserManagement"),
        meta: { isAuth: true },
      },
      {
        path:'/AnnouncementManagement',
        name:'/AnnouncementManagement',
        component: () =>import('@/views/management/AnnouncementManagement'),
        meta: { isAuth: true },
      },
      {
        path:'/MessageManagement',
        name:'/MessageManagement',
        component: () =>import('@/views/management/MessageManagement'),
        meta: { isAuth: true },
      },
      {
        path:'/WorkManagement',
        name:'/WorkManagement',
        component: () =>import('@/views/management/WorkManagement'),
        meta: { isAuth: true },
      },
      {
        path:'/DormitoryManagement',
        name:'/DormitoryManagement',
        component: () =>import('@/views/management/DormitoryManagement'),
        meta: { isAuth: true },
      },
      {
        path: '/FeeController',
        name: '/FeeController',
        component: () => import('@/views/management/FeeController'),
        meta: { isAuth: true },
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
    path: '/',
    name: '/Login',
    component: () => import('@/views/Login'),
    meta: { isAuth: false },
  },
  {
    path: '/HandleProposal',
    name: '/HandleProposal',
    component: () => import('@/views/HandleProposal'),
    meta: { isAuth: true },
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
    name: 'InfoFulfill',
    component: () => import('@/views/InfoFulfill'),
    meta: { isAuth: false, title:'完善信息' },
  },
  {
    path: '/Announcement',
    name: '/Announcement',
    component: () => import('@/views/Announcement'),
    meta: { isAuth: true },
  },
  {
    path: '/Details',
    name: '/Details',
    component: () => import('@/views/Details'),
    meta: { isAuth: true },
  },
  {
    path: '/FeeAddress',
    name: '/FeeAddress',
    component: () => import('@/views/FeeAddress'),
    meta: { isAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('Authorization')
  if (token) {
    // 如果有 token 认为已登录，放行
    next();
  } else if (to.name === 'Login' || to.name === 'ManagerLogin' || to.name === 'InfoFulfill'){
    // 如果没有 token，跳转到登录页面，并将目标路由作为参数传递
    next({
      path: '/',
      query: {redirect: to.fullPath},
    });
  }else{
    // 不需要验证身份的路由直接放行
    next();
  }
})


export default router
