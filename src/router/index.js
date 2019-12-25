//导入路由模块
import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../store'


import Login from '../views/login/index'
import Home from '../views/home'
import Welcome from '../views/welcome/index'
import NotFound from '../views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  //路由规则配置
  routes: [
    //登录
    { path: '/login', component: Login },
    {
      path:'/',
      component: Home,
      children :[
        //欢迎页面
        {path:'/',component:Welcome}
      ]
    },
    //404页面
    {path:'*',component:NotFound}
  ]
})

//前置守卫
// router.beforeEach((to,from,next)=> {
//   //to去哪里，from来自哪里，next放行
//   if (to.path != '/login' && !store.getUser().token) return next('/login')
//   next()
// })
export default router
