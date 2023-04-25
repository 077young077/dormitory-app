<template>
    <div>
      <div class="header">
        <div class="box">
          <h1>
            <img src="../assets/icon/logo.png">
            <span style="rgba(246, 146, 70, 0.96);font-weight: 600;">智慧楼栋</span>
          </h1>
          <nav>
            <el-icon><House /></el-icon>
            <router-link active-class="active" :to="{path: '/home'}"><div style="line-height: 20px;font-size: 18px;width: 40px">首页</div></router-link>
          </nav>
          <nav>
            <el-icon><Files /></el-icon>
            <router-link active-class="active" :to="{path: '/Announcement'}"><div style="line-height: 20px;font-size: 18px;width: 120px">系统公告</div></router-link>
          </nav>
        </div>
        <div class="box">
          <div class="condition" style="width: 150px">
            当前状况：<span v-if="this.Thisuser">游客</span><span v-else>{{this.userInformation.name}} </span>
          </div>
          <div v-if="this.flag">
            <el-icon><UserFilled /></el-icon>已登录
          </div>
          <nav v-else>
            <router-link active-class="active" to="/login" ><div style="line-height: 20px;font-size: 18px;width: 60px;margin-left: 20px"><el-icon><UserFilled /></el-icon>登录</div></router-link>
          </nav>
          <nav>
            <router-link active-class="active" to="/login" @click="clearStorage()"><div style="line-height: 20px;font-size: 18px;width: 120px;margin-left: 0"><el-icon><SwitchButton /></el-icon>退出登录</div></router-link>
          </nav>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import {
    Search,
    House,
    Files,
    Monitor,
    UserFilled,
    UploadFilled,
    ChatLineSquare,
    InfoFilled,
    ArrowDown,
    SwitchButton
  } from '@element-plus/icons-vue'
  import {API1} from "@/utils/request";
  export default {
    name: "Header",
    components :{
      Search,
      House,
      Files,
      Monitor,
      UserFilled,
      UploadFilled,
      ChatLineSquare,
      InfoFilled,
      ArrowDown,
      SwitchButton
    },
    data(){
      return{
        input:'',
        userInformation:{},
        flag: false,
      }
    },
    mounted() {
      this.getOtherInfo();
    },
    methods:{
      getOtherInfo(){
        API1.getRequest(
            '/dor/user/info').then(res => {
          if (res.success) {
            this.userInformation = res.data
            this.flag = true
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      },
      clearStorage(){
        sessionStorage.removeItem('User')
        localStorage.removeItem("Authorization")
      }
    }
  }
  </script>
  
  <style scoped>
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    color: #a6a6a6;
    background-color: #ffffff;
    font-weight: 600;
  }
  .box{
    display: flex;
    align-items: center;
  }
  h1{
    display: flex;
    align-items: center;
    font: normal 28px Cookie, Arial, Helvetica, sans-serif;
    padding: 0px 20px;
  }
  img{
    width: 40px;
    height: 40px;
  }
  
  nav {
    display: flex;
    align-items: center;
    margin: 0px 10px;
    font:16px Arial, Helvetica, sans-serif;
    width: 120px;
  }
  nav a{
    padding: 0 15px;
    width: 120px;
    text-decoration:none;
    color: #a6a6a6;
    font-size: 16px;
    font-weight: 600;
    opacity: 0.9;
  }
  
  nav a:hover {
    opacity: 1;
  }
  
  </style>
  