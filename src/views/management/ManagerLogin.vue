<template>
  <div id="a" style="width: 100%;height: 100vh;overflow: hidden;display: flex;flex-direction: row;align-content: center">
    <div style="width: 400px;margin-bottom: 150px;margin-top: 150px;margin-left: 25vw;display: block;">
      <div style="display: flex;flex-direction: row;margin-left: 110px">
        <div style="width: 50px;height: 50px;display: block"><img src="../../assets/icon/logo.png" alt="" style="width: 50px;height: 50px"></div>
        <div style="color:#44cf7c;font-size: 30px;text-align: center;margin-bottom: 10px;font-weight: 600;display: block;text-shadow: 2px 2px 4px #000000;">欢迎管理员登陆</div>
      </div>
      <el-form :model="form" ref="form" size="large" :rules="rules">
        <el-form-item prop="username" style="margin-top: 20px">
          <el-input v-model="form.username">
            <template #prepend>用户名</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" style="margin-top: 20px">
          <el-input v-model="form.password" show-password @keyup.enter.native="login">
            <template #prepend>密 码</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              style="width: 100%;margin-top: 20px;background-color: rgba(246, 146, 70, 0.96);color: white;font-weight: bolder;border: 0px"
              @click="login">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="display: block;margin-bottom: 150px;margin-top: 150px;margin-left: 100px;">
      <el-card :body-style="{ padding: '0px' }">
        <img
            :src="this.picture"
            class="image" style="width: 300px"
        />
        <div style="padding: 14px">
          <span style="font-size: 16px;font-weight: 600;color: #a6a6a6">欢迎管理员登录</span>
          <div class="bottom">
            <time class="time">{{ gettime }}</time>
          </div>
        </div>
        <div style="float: right;color: #a6a6a6;font-size: 16px;font-weight: 600;padding: 5px" @click="gotoUserLogin">
          返回用户登录<el-icon><UserFilled /></el-icon>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

import {postRequest} from "@/utils/request";

import {UserFilled} from '@element-plus/icons-vue'
export default {
  name: "ManagerLogin",
  components: {UserFilled},
  data() {
    return {
      gettime: "",
      form: {
        username: '',
        password: '',
      },
      picture:'',
      rules: {
        username: [
          {
            required: true,
            message: '输入用户名',
            trigger: 'blur'
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change',
          },
        ]
      }
    }
  },
  created() {
    this.picture='https://source.unsplash.com/random';
  },
  mounted: function () {
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
    this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
    sessionStorage.removeItem("User")
    localStorage.removeItem("Authorization")
  },
  methods: {
    ...mapMutations(['changeLogin']),
    gotoUserLogin(){
      this.$router.push("/Login")
    },
    login() {
      let _this = this;
      console.log(this.form)
      this.$router.push('/UserManagement')
      postRequest('http://lizp.vip:5453/dor/pm/login', this.form).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: "登陆成功"
          })
          _this.userToken = res.data;
          sessionStorage.setItem("User", JSON.stringify(this.form))
          _this.changeLogin({ Authorization: _this.userToken });
          _this.$router.push('/UserManagement');
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>
body{
  height: 100%;
  width: 100%;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

#a {
  /*position: fixed;*/
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  /*margin: auto;*/
  background-color: rgb(255, 208, 0);
  background-image: url("../../assets/img/loginbg.webp");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image-width: 70%;
  background-image-height: 100%;
  /*position: absolute;*/
  padding: 0px;
  width: 100%;
  height: 100%;

}
</style>
