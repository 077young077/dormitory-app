<template>
  <div id="a"
       style="width: 100%;height: 100vh;overflow: hidden;display: flex;flex-direction: row;align-content: center">
    <div class="container">
      <div class="inline-box">
        <div style="width: 50px;height: 50px;display: block;flex: 1;margin-left: 180px;width: 30%"><img
            src="../assets/icon/logo.png" alt=""
            style="width: 50px;height: 50px"></div>
        <div
            style="color:#44cf7c;font-size: 30px;text-align: center;margin-bottom: 10px;font-weight: 600;display: block;width: 70%">
          智慧楼栋-人脸识别注册
        </div>
      </div>
      <div class="inline-box">
        <!-- 摄像展示要用video标签 -->
        <video
            class="item"
            ref="video"
            width="300" height="300"
            preload
            autoplay
            loop
            muted
        ></video>
        <!-- 截取的照片用canvas标签展示 -->
        <canvas class="item" ref="canvas" width="300" height="300"></canvas>
      </div>
      <div class="inline-box">
        <el-button @click="openMedia" class="bth">打开</el-button>
        <el-button @click="closeMedia" class="bth">关闭</el-button>
        <el-button @click="drawMedia" class="bth">截取</el-button>
      </div>
      <el-form :model="info.form" ref="info.form" size="large">
        <el-form-item prop="studentId">
          <el-input v-model="info.form.studentId">
            <template #prepend>学号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="info.form.password" show-password>
            <template #prepend>密 码</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="info.form.confirmPassword" show-password @keyup.enter.native="register">
            <template #prepend>确认密码</template>
          </el-input>
        </el-form-item>
        <el-button
            style="width: 100%;margin-top: 20px;background-color: #42b983;color: white;font-weight: bolder;border: 0px"
            @click="register">
          注册
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import {ref, onMounted,reactive} from "vue";
import request from "@/utils/request";
const video = ref(null);
const canvas = ref(null);
const imgSrc = ref("");
let _this = this;
const  info = reactive ({
  form: {
    picture: '',
    password: '',
    confirmPassword: '',
  },
  rules: {
    name: [
      {required: true, message: '输入用户名', trigger: 'blur'},
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change',
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: 'change',
      },
    ],
  }
});

onMounted(() => {
  openMedia();
  console.info('video', video.value);
  console.log('video', video.value.width);
  console.log('video', video.value.height);
  _this = this;
});

function register() {
  console.log(info.form)
  if (info.form.confirmPassword != info.form.password) {
    ElMessageBox.confirm('两次密码不一致', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    return
  }
  if (info.form.picture != '') {
    request.post('', info.form).then(res => {
      if (res.code === '0') {
        ElMessageBox.confirm('登陆成功', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        });
        this.$router.push("/login") //登陆成功就跳转到后台管理
      } else {
        ElMessageBox.confirm('登录错误', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        });
      }

    })
  }else {
    ElMessageBox.confirm('没有录入人脸', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    });
  }
}
function openMedia() {
  // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  // 标准的API
  navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        // 摄像头开启成功
        video.value.srcObject = stream;
        video.value?.play();
      })
      .catch((err) => {
        console.log("err", err);
      });
}

function closeMedia() {
  video.value.srcObject.getTracks()[0].stop();
}

function drawMedia() {
  // console.log(canvas.value.width, canvas.value.width * (320 / 240));
  const ctx = canvas.value?.getContext("2d");
  ctx?.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.drawImage(
      video.value,
      (canvas.value.width - canvas.value.width * (320 / 240)) / 2,
      0,
      canvas.value.width * (320 / 240),
      canvas.value.height
  );
  const image = canvas.value.toDataURL("image/png");
  imgSrc.value = image;
  console.log(imgSrc.value)
  info.form.picture =imgSrc.value
}

</script>

<style scoped>
video {
  object-fit: cover;
  transform: scaleX(-1);
  margin-right: 10px;
  background-color: #ffffff;
}

canvas {
  transform: scaleX(-1);
  margin-left: 10px;
  background-color: #ffffff;
}

.inline-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
}

el-input {
  padding: 20px;
}

.bth {
  width: 33%;
  background-color: #43cf7c;
  color: #FFFFFF;
  width: 100%;
  margin-top: 0;
  font-weight: bolder;
  border: 0px
}

.item {
  display: block;
  border: 5px solid #FFFFFF;
  border-radius: 5px;
}

.container {
  justify-items: center;
  align-items: center;
  margin: 20px auto;
}

#a {
  /*position: fixed;*/
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  /*margin: auto;*/
  background-color: rgb(255, 208, 0);
  background-image: url("../assets/img/loginbg.webp");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image-width: 100%;
  background-image-height: 100%;
  /*position: absolute;*/
  padding: 0px;
  width: 100%;
  height: 100%;

}
</style>