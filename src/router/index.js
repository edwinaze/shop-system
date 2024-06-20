import { useRoute, createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: '登录',
      component: () => import('../components/Login.vue')
    },
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
          meta: {
            title: '用户列表',
          },
          children: [
            {
              path: '',
              component: () => import('../components/user/MyUsers.vue'),

            },
            {
              path: ':id',
              name: 'details',
              component: () => import('../components/user/MyUserDetail.vue'), props: true,
              meta: {
                title: '用户详情',
              }
            },
          ],
        },
        {
          path: 'goods',
          component: () => import('../components/goods/MyGoods.vue'),
          meta: {
            title: '商品列表',
          }
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

  console.log("to: ", [to.path, to.fullPath, to.name])
  console.log("from: ", [from.path, from.fullPath, from.name])
  next()
})
