//导入路由模块
import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../store'

//登录页
import Login from '../views/login/index'
//主页
import Home from '../views/home'
import Welcome from '../views/welcome/index'
//404页面
import NotFound from '../views/404'
//内容管理页
import Article from '../views/article'
//素材管理页
import Image from '../views/image'
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
        {path:'/',component:Welcome},
        //内容管理页面
        {path:'/article',component:Article},
        //素材管理页
        {path:'image',component:Image}
      ]
    },
    //404页面
    {path:'*',component:NotFound},

  ]
})

//前置守卫
router.beforeEach((to,from,next)=> {
  //to去哪里，from来自哪里，next放行
  if (to.path != '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
