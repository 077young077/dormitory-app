<template>
  <div>
    <HomeHeader/>
  </div>
  <div class="bg">
    <div class="paper">
      <div class="header">
        <el-form :model="form" label-width="12px">
          <div class="title">
            拍照及预览
          </div>
          <div class="inline-box">
            <!-- 摄像展示要用video标签 -->
            <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay style="border: #43cf7c 10px solid;border-radius: 1em"></video>
            <canvas style="display:none" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
            <div v-if="imgSrc" class="img_bg_camera" style="border: #43cf7c 10px solid;border-radius: 1em">
              <img :src="imgSrc" alt class="tx_img" />
            </div>
          </div>
          <div class="inline-box">
            <el-button @click="getCompetence()" class="bth">打开</el-button>
            <el-button @click="stopNavigator()" class="bth">关闭</el-button>
            <el-button @click="setImage()" class="bth">截取</el-button>
          </div>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请学生姓名
            </el-tag>
            <el-input disabled :placeholder='this.userInformation.name' />
            <!--            {{this.user.studentId}}-->
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请学生学号
            </el-tag>
            <el-input disabled :placeholder='this.userInformation.id' />
            <!--            {{this.user.studentId}}-->
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请主题
            </el-tag>
            <el-input v-model="form.title" placeholder="简要描述您遇到的问题">
            </el-input>
            <!--            {{ this.User.address}}-->
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请类型
            </el-tag>
            <el-radio-group v-model="form.type">
              <el-radio v-for="item in types"
                        :label="item.id"
                        :key="item.id">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请详情
            </el-tag>
            <el-input type="textarea" v-model="form.content" maxlength="50"
                      show-word-limit>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="post"
                   style="background-color: darkseagreen;border: 0;margin: 10px 40%">
          提交
        </el-button>
      </div>
    </div>
  </div>

</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import {API1} from "@/utils/request";

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
      userInformation: {},
      types:{},
    }
  },
  mounted() {
    this.getCompetence();
    this.getInfo();
    this.getType();
  },
  methods: {
    getType(){
      API1.getRequest('/dor/work/type').then(res=>{
        this.types=res.data
      })
    },
    post() {
      console.log(this.form)
      if(this.form.content&&this.form.face&&this.form.title&&this.form.type){
        API1.postRequest('/dor/work', {
          "content": this.form.content,
          "face": this.form.face,
          "title": this.form.title,
          "typeId": this.form.type,
        }).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "提交申请成功",
            })
            this.$router.push('/home')
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
      API1.getRequest(
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
      this.form.face = image;
      this.stopNavigator()
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
.paper {
  border-radius: 0.5em;
  border: 1px solid #c5c5c5;
  background-color: #fcfffc;
  box-shadow: #999999;
  padding: 20px 40px;
  line-height: 25px;
  margin: 30px 200px 30px 200px;
}

.inline-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
}

.title{
  font-size: 26px;
  font-weight: 600;
  color: #43cf7c;
  text-align: center;
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


li {
  font-weight: 500;
  color: white;
  font-size: 25px;
}

.bg {
  text-align: center;
  font-size: 20px;
  text-shadow: #999999;
  color: #000000;
  width: 100%;
  height: 800px;
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(rgba(72, 217, 130, 0.2)));
}
</style>