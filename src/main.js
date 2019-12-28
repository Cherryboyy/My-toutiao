import Vue from 'vue'
import App from './App.vue'

//导入路由模块
import router from './router/index'

//导入element组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//注册全局组件
import MyBread from './components/my-bread'
Vue.component('my-bread',MyBread)

//配制axios
import axios from './api/index'

Vue.use(ElementUI)
Vue.prototype.$http = axios

//这是日志的详细
Vue.config.productionTip = false


new Vue({
  router,//挂载路由
  render: h => h(App)
}).$mount('#app')
