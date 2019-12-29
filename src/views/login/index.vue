<template>
  <div class='container'>
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px;"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import store from '../../store'

  export default {
    data() {
      //rule当前字段的校验对象，value字段的值，callback回调函数，成功或者失败
      const checkMobile = (rule, value, callback) => {
        // 校验手机号  1开头 第二位3-9  9位数字
        if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号格式不对'))
        callback()
      }
      return {
        loginForm: {
          mobile: '13200000000',
          code: '246810',
          // check: true
        },
        loginRules: {
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {len: 6, message: '长度是6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login() {
        //对所有表单进行验证
        this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            // //发送请求
            // this.$http
            //   .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            //   .then(res=> {
            //     console.log(res.data)
            //     //存储用户信息
            //     store.setUser(res.data.data)//res.data
            //     //跳转
            //     this.$router.push('/')
            //     this.$message.success('登录成功')
            //   })
            //   .catch(()=> {
            //     this.$message.error('手机号或验证码错误')
            //   })
            try {
              const res = await this.$http.post('authorizations', this.loginForm)
              store.setUser(res.data.data)
              this.$router.push('/')
            } catch (e) {
              this.$message.error('手机号或验证码错误')
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    /*// 背景图定位 / 背景图尺寸 contain 等比缩放完整在容器内显示  cover  等比缩放完全铺面容器*/
    background: url(../../assets/images/true.gif) no-repeat center / cover
  }

  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: rgba(0, 0, 0, .3);
    transform: translate(-50%, -60%);
  }

  img {
    display: block;
    width: 200px;
    margin: 0 auto;
    margin-bottom: 10px;
  }


</style>
