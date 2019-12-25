//设置用户的信息保存

const KEY = 'hm-toutiao-pc-91-user'
export default {
  //传入用户信息对象
  setUser (user) {
    window.sessionStorage.setItem(KEY,JSON.stringify(user))
  },
  //得到用户信息对象
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  //删除用户的信息
  delUser() {
    window.sessionStorage.removeItem(KEY)
  }
}
