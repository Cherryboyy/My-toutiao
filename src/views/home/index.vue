<template>
  <el-container class="wrapper">
    <el-aside width="200px" :width="isCollapse?'64px':'200px'">
      <!--      <el-menu-->
      <!--        :collapse="isCollapse"-->
      <!--        :collapse-transition="false"-->
      <!--        default-active="2"-->
      <!--        background-color="#545c64"-->
      <!--        text-color="#fff"-->
      <!--        active-text-color="#ffd04b">-->

      <!--        &lt;!&ndash; el-submenu   有子菜单的菜单项&ndash;&gt;-->
      <!--        &lt;!&ndash; el-menu-item  没有子菜单的菜单项 &ndash;&gt;-->
      <!--        <el-menu-item index="2">-->
      <!--          <i class="el-icon-menu"></i>-->
      <!--          <span slot="title">导航二 K</span>-->
      <!--        </el-menu-item>-->
      <!--      </el-menu>-->
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      <!--      default-active指定那个菜单被激活选中-->
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-header>
          <span class="el-icon-s-fold" @click="toggleMenu()"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <el-dropdown class='my-dropdown'>
          <span class="el-dropdown-link">
            <img :src="photo" alt/>
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="setting()">个人设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  //引入储存本地信息文件
  import store from '../../store'
  export default {
    // name: ''
    data() {
      return {
        isCollapse: false,
        name:'',
        photo:''
      }
    },
    created() {
      const user = store.getUser()
      this.name = user.name
      this.photo = user.photo
    },
    methods: {
      toggleMenu() {
        this.isCollapse = !this.isCollapse
      },
      //个人设置
      setting () {
        this.$router.push('/setting')
      },
      //清空本地tekon值
      logout() {
        store.delUser()
        this.$router.push('/login')
      }
    }
  }

</script>

<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .el-aside {
    background: #002033;
  }

  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
  }

  .el-icon-s-fold {
    font-size: 24px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
    padding-left: 10px;
  }

  .my-dropdown {
    float: right;
  }

  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  .el-dropdown-link {
    font-weight: bold;
  }

  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
    140px auto;
  }

  .el-menu {
    border-right: none;
  }

  .miniLogo {
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }

</style>
