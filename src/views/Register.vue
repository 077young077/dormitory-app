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
        <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay ></video>
        <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
        <div v-if="imgSrc" class="img_bg_camera">
          <img :src="imgSrc" alt class="tx_img" />
        </div>
      </div>
      <div class="inline-box">
        <el-button @click="getCompetence()" class="bth">打开</el-button>
        <el-button @click="stopNavigator()" class="bth">关闭</el-button>
        <el-button @click="setImage()" class="bth">截取</el-button>
      </div>
      <el-form :model="form" ref="info.form" size="large">
        <el-form-item prop="studentId">
          <el-input v-model="form.id" style="width: 55%;margin: 5px 22.5% 5px 22.5%">
            <template #prepend>学号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="name" style="width: 55%;margin: 5px 22.5% 5px 22.5%">
          <el-input v-model="form.name">
            <template #prepend>姓名</template>
          </el-input>
        </el-form-item>
        <div class="inline-box" style="width: 60%;margin: 5px 21% 5px 19.5%">
          <el-select v-model="form.majorId" size="large" placeholder="选择学院" fit-input-width>
            <el-option
                v-for="item in majors"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
<!--          <el-radio-group v-model="radio" text-color="#ffffff">-->
<!--            <el-radio-button label="0" size="large" class="my-radio-button">男</el-radio-button>-->
<!--            <el-radio-button label="1" size="large" class="my-radio-button">女</el-radio-button>-->
<!--          </el-radio-group>-->
        </div>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password style="width: 55%;margin: 5px 22.5% 5px 22.5%">
            <template #prepend>密 码</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" style="width: 55%;margin: 5px 22.5% 5px 22.5%">
          <el-input v-model="form.confirmPassword" show-password @keyup.enter.native="register">
            <template #prepend>确认密码</template>
          </el-input>
        </el-form-item>
        <el-button
            style="width: 55%;margin-top: 10px;background-color: #42b983;color: white;font-weight: bolder;border: 0px;margin-left: 22.5%;margin-right: 22.5%"
            @click="register">
          注册
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import {getRequest, postRequest} from "@/utils/request";
import {mapMutations} from "vuex";

export default {
  name: "HandleProposal",
  components: {
    HomeHeader
  },
  data() {
    return {
      form: {},
      videoWidth: 250,
      videoHeight: 150,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      majors:[],
    }
  },
  mounted() {
    sessionStorage.removeItem("User")
    localStorage.removeItem("Authorization")
    this.getCompetence();
    this.getMajor();
  },
  methods: {
    ...mapMutations(['changeLogin']),
    getMajor(){
      getRequest('/dor/user/major').then(res=>{
        this.majors=res.data
      })
    },
    register() {
      console.log(this.form)
      if((this.form.password === this.form.confirmPassword)&&(this.form.face != '')){
        postRequest('/dor/user/registry', {
          "face": this.form.face,
          "id": this.form.id,
          "majorId":this.form.majorId,
          "name": this.form.name,
          "password": this.form.password,
        }).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "注册成功",
            })
            this.userToken = res.data;
            sessionStorage.setItem("User", JSON.stringify(this.form))
            // 将用户token保存到vuex中
            this.changeLogin({ Authorization: this.userToken });
            this.$router.push('/InfoFulfill')
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      }else {
        this.$message({
          type: "error",
          message: "不能有选项为空"
        })
      }
    },
    getInfo() {
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
    getCompetence() {
      const _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = "block";
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            //不存在则报错
            return Promise.reject(
                new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)",
        },
      };
      navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in _this.thisVideo) {
              _this.thisVideo.srcObject = stream;
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream);
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play();
            };
          })
          .catch((err) => {
            console.log(err);
          });
      alert("打开摄像头");
    },
    //  绘制图片（拍照功能）
    setImage() {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
          _this.thisVideo,
          0,
          0,
          _this.videoWidth,
          _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image; //赋值并预览图片
      alert("拍照");
      this.form.face = image;
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
      alert("关闭摄像头");
    },
  }
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
  padding: 5px;
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

.my-radio-button .el-radio-button__inner {
  border: 1px solid #a6a6a6 !important;
  border-radius: 20px;
  background-color: #fff;
  color: #333;
}

.my-radio-button .el-radio-button__inner:hover {
  border-color: #a6a6a6 !important;
}

.my-radio-button .el-radio-button__inner.is-checked {
  background-color: #46d090 !important;
  color: #fff !important;
}
</style>