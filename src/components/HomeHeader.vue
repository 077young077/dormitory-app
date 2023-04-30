<template>
    <div>
      <div class="header">
        <div class="box">
          <h1>
            <img src="data:image/png;base64,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">
            <span style="rgba(246, 146, 70, 0.96);font-weight: 600;">智慧楼栋</span>
          </h1>
          <nav>
            <el-icon><House /></el-icon>
            <router-link active-class="active" :to="{path: '/'}"><div style="line-height: 20px;font-size: 18px;width: 40px">首页</div></router-link>
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
            <router-link active-class="active" to="/Login" ><div style="line-height: 20px;font-size: 18px;width: 60px;margin-left: 20px"><el-icon><UserFilled /></el-icon>登录</div></router-link>
          </nav>
          <nav>
            <router-link active-class="active" to="/Login" @click="clearStorage()"><div style="line-height: 20px;font-size: 18px;width: 120px;margin-left: 0"><el-icon><SwitchButton /></el-icon>退出登录</div></router-link>
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
  