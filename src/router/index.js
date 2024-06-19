import { RouterView, createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', component: () => import('../components/Login.vue') },
    {
      path: '/',
      component: () => import('../layout/AppLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('../components/Home.vue'),
        },
        {
          path: 'users',
          component: () => import('../components/user/User.vue'),
          children: [
            {
              path: '',
              component: () => import('../components/subcomponents/MyUsers.vue')
            },
            {
              path: ':id',
              name: 'details',
              component: () => import('../components/user/MyUserDetail.vue'), props: true
            }
          ]

        },
        {
          path: 'goods',
          component: () => import('../components/subcomponents/MyGoods.vue')
        },
      ]
    },

  ]
})


export default router

router.beforeEach((to, from, next) => {
  // 如果访问的是登录页面，直接执行下一个钩子函数
  if (to.path === '/login')
    return next()

  const isLogin = useAuthStore().isLogin;
  console.log(isLogin)
  if (!isLogin) {
    return next('/login')
  }
  next()
})
