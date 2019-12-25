//导入路由模块
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '../views/login/index'
import Home from '../views/home'
import Welcome from '../views/welcome/index'

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
    }
  ]
})
export default router
