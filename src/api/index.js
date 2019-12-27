//提供一个配制好的axios，导出到main里面使用
import axios from 'axios'
import store from '../store/index'
//默认配制
axios.defaults.baseURL='http://ttapi.research.itcast.cn/mp/v1_0/'
//axios.defaults.headers.Authorization=`Bearer ${store.getUser().token}`


//请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(config=> {
  config.headers.Authorization=`Bearer ${store.getUser().token}`
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
export default axios