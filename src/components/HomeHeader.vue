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
          <nav>
            <router-link active-class="active" to="/login" ><div style="line-height: 20px;font-size: 18px;width: 60px"><el-icon><UserFilled /></el-icon>登录</div></router-link>
          </nav>
<!--          <div class="condition" style="width: 150px">-->
<!--            <el-dropdown trigger="click">-->
<!--        <span class="el-dropdown-link" style="color: #a6a6a6;font:16px Arial, Helvetica, sans-serif;font-weight: 600">-->
<!--          系统通知-->
<!--          <el-icon class="el-icon&#45;&#45;right">-->
<!--        <arrow-down />-->
<!--      </el-icon>-->
<!--        </span>-->
<!--              <template #dropdown>-->
<!--                <el-dropdown-menu>-->
<!--                  <el-dropdown-item :icon="InfoFilled" v-for="item in 20" :key="item">Action 1</el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--              </template>-->
<!--            </el-dropdown>-->
<!--          </div>-->
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
    ArrowDown
  } from '@element-plus/icons-vue'
  import {getRequest} from "@/utils/request";
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
      ArrowDown
    },
    data(){
      return{
        input:'',
        userInformation:{},
      }
    },
    mounted() {
      this.getOtherInfo();
    },
    methods:{
      getOtherInfo(){
        getRequest(
            '/dor/user/info').then(res => {
          if (res.success) {
            this.userInformation = res.data
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      },
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
  