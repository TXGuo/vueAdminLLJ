<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- <breadcrumb></breadcrumb> -->
    <div class="navLeft">
      <a class="logo">
        <img src="../../../assets/logo.svg" />
      </a>
      <span class="title">LLJ 运营平台</span>
    </div>
    <div class="navRight is-flex">
      <span class="nav-item">{{auth}}</span>
      <span class="nav-item1">：</span>
      <span class="nav-item pointer" @click="myInfo">{{ user | maxLength }}</span>
      <span class="nav-item">
            <el-button @click="changePassword" class="button">修改密码</el-button>
            <el-button type="primary" @click="logout">安全退出</el-button>
          </span>
    </div>
    <!--<el-dropdown class="avatar-container" trigger="click">-->
      <!--<div class="avatar-wrapper">-->
        <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
        <!--<i class="el-icon-caret-bottom"></i>-->
      <!--</div>-->
      <!--<el-dropdown-menu class="user-dropdown" slot="dropdown">-->
        <!--<router-link class="inlineBlock" to="/">-->
          <!--<el-dropdown-item>-->
            <!--Home-->
          <!--</el-dropdown-item>-->
        <!--</router-link>-->
        <!--<el-dropdown-item divided>-->
          <!--<span @click="logout" style="display:block;">LogOut</span>-->
        <!--</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data () {
    return {
      user:window.localStorage.getItem('name'),
      auth:window.localStorage.getItem('author')==0?'普通管理员':'超级管理员'
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  filters:{
    maxLength(val){
      if(val){
        return val.length<=3?val:val.substr(0,3)+'...'
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    myInfo(){
      this.$router.push('/mySelf/myInfo')
    },
    changePassword () {
      this.$router.push('/mySelf/users/password')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .navLeft{
    float:left;
    height:50px;
    .logo{
      width:50px;
      height:50px;
      float:left;
      img{
        width:100%;
        height:100%;
        display:block;
      }
    }
    .title{
      color:#4a4a4a;
      font-weight:700;
    }
  }
  .navRight{
    float:right;
    .pointer{
      cursor:pointer;
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

