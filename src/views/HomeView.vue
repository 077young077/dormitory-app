<template>
  <div>
    <HomeHeader/>
  </div>
  <div class="container" style="position: relative;width: 100%">
    <div class="wrapper" style="position: absolute">
      <div class="one item">
        <div class="title">系统公告<div style="float: right;margin-right: 10px;display: block" @click="goToAnnounceMent"><el-icon
            style="color: #43cf7c;width: 25px"><More/></el-icon></div></div>
        <el-scrollbar height="80%">
          <p v-for="(item,index) in this.annouce " :key="item" class="scrollbar-demo-item">{{ item.title }}——{{ item.content }}</p>
        </el-scrollbar>
      </div>
      <div class="two item">
        <div class="title" style="margin-bottom: 5px"><span style="margin-right: 10px">报修申请</span><span>
          <el-popover placement="right" :width="400" trigger="click">
          <template #reference>
            <el-button style="background-color: #43cf7c;color: #ffffff;border: 0">增加报修请求</el-button>
          </template>
          <el-form :model="form" label-width="12px">
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请学生学号
            </el-tag>
            <el-input v-model="form.studentId" disabled placeholder="2020211372" />
<!--            {{this.user.studentId}}-->
          </el-form-item>
            <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请寝室
            </el-tag>
              <el-input v-model="form.address" disabled placeholder="16321">
              </el-input>
              <!--            {{ this.User.address}}-->
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请类型
            </el-tag>
<el-radio-group v-model="form.type">
        <el-radio label="water" />
        <el-radio label="electric" />
  <el-radio label="furnish" />
        <el-radio label="others" />
      </el-radio-group>
          </el-form-item>
            <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              申请详情
            </el-tag>
              <el-input type="textarea" v-model="form.description">
              </el-input>
          </el-form-item>
        </el-form>
        <div class="inline-box">
        <el-button type="primary" @click="save(this.form)" style="background-color: darkseagreen;border: 0;margin: 10px 40%">
          提交
        </el-button>
        </div>
        </el-popover>
        </span></div>
        <el-scrollbar height="270px" style="margin-right: 10px;margin-top: 10px;" v-if="this.postApplication">
          <el-card class="box-card application" v-for="(item,index) in postApplication" :key="item"
                   style="width: 92%;">
            <div class="card-header" >
              <div style="font-size: 18px;color: #a6a6a6;width: 318px">报修类型：{{ item.title }}</div>
              <div style="font-size: 18px;color: #a6a6a6;width: 318px">报修类型：{{ item.typeId }}</div>
              <div style="font-size: 18px;color: #a6a6a6;width: 318px">报修时间：{{ item.commitTime }}</div>
              <div style="font-size: 18px;color: #a6a6a6;width: 318px">目前状况：{{ item.status }}</div>
              <div style="font-size: 18px;color: #a6a6a6;width: 318px">详细描述：{{ item.content }}</div>
            </div>
            <div style="height: 50px">
              <el-button style="background-color: #43cf7c;color: #ffffff;border: 0">撤销申请</el-button>
            </div>
          </el-card>
        </el-scrollbar>
        <div class="img" v-else>
          <img src="../assets/img/nullcode.png" alt="">
        </div>
      </div>
      <div class="three item">
        <div class="title">我的寝室</div>
        <div style="height: 270px;margin-left: 10px;margin-right:10px;margin-top: 11px;background-color: #FFFFFF">
          <div style="margin: 10px">
            <img src="../assets/img/man.png" alt="" style="width: 20%;border: 2px solid #dadada;margin: 10px 40% 10px 40%;border-radius: 3px">
            <div>
              <div class="inline" style="margin:10px 15% 10px 15%">
                <span style="margin-right: 10px;"><el-button
                    style="background-color: #43cf7c;color: white">更改人脸信息</el-button></span>
                <span style="margin-left: 10px"><el-button
                    style="background-color: #43cf7c;color: white">完善个人资料</el-button></span>
              </div>


            </div>
          </div>
          <div style="margin-left: 10px;line-height: 25px">
<!--            class="card-header"-->
            <div style="font-size: 18px;color: #a6a6a6;width: 318px;margin-left: 0">姓名：{{ this.userInformation.name }}</div>
            <div style="font-size: 18px;color: #a6a6a6;width: 318px">学号：{{ this.userInformation.id }}</div>
            <div style="font-size: 18px;color: #a6a6a6;width: 318px">所属楼栋及寝室：
<!--              {{ this.userInfo.building }}-->
              {{ this.userInformation.room }}</div>
            <!--              <div style="font-size: 18px;color: #a6a6a6">是否为寝室长：{{ is }}</div>-->
            <div style="font-size: 18px;color: #a6a6a6;width: 318px">本周寝室卫生得分：{{ this.userInformation.score }}</div>
          </div>
        </div>
      </div>
      <div class="four item" style="padding: 10px">
        <div style="margin-bottom: 5px" class="title"><span style="margin-right: 10px">寝室用水数据</span><span><el-button
            style="background-color: #43cf7c;color: #FFFFFF;border: 0">去缴费</el-button></span></div>
<!--        <div id="myChart3" :style="{width: '100%', height: '80%'}"></div>-->
        <el-descriptions title="" style="background-color: #FFFFFF;padding: 10px;color: #a6a6a6" direction="vertical" border>
          <el-descriptions-item label="当前水费">{{this.waterCost.amount}} ￥</el-descriptions-item>
          <el-descriptions-item label="用水量">{{this.waterCost.cost}} L</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag size="small" type="warning" v-if="this.waterCost.overdue">已欠费</el-tag>
            <el-tag size="small" type="success" v-else>未欠费</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <div class="appendix" style="margin-top: 50px;margin-top: 0;background-color: #FFFFFF;height: 50px;text-align: center">
          <div style="font-size: 15px;color: #a6a6a6">统计截至今日</div>
        </div>
      </div>
      <div class="five item" style="padding: 10px">
        <div class="title" style="margin-bottom: 5px"><span style="margin-right: 10px">寝室用电数据</span><span><el-button
            style="background-color: #43cf7c;color: #FFFFFF;border: 0">去缴费</el-button></span></div>
        <!--          <div id="myChart2" :style="{width: '100%', height: '83%'}"></div>-->
        <div class="card">
          <div class="address" style="display: flex;flex-direction: row;justify-content: left;margin-left: 10px">
            <el-icon style="color:#43cf7c;">
              <LocationInformation/>
            </el-icon>
            <div style="margin-left:5px;font-size: 18px;font-weight:600;color: rgba(246, 146, 70, 0.96)">
<!--              {{ this.userInformation.building }}-->
            </div>
            <div
                style="margin-left:5px;font-size: 16px;font-weight:500;color: rgba(246, 146, 70, 0.96);margin-top: 3px">
                {{ this.userInformation.room }}
            </div>
          </div>
          <div class="p-title" style="display: flex;flex-direction: row;justify-content: space-around">
            <div class="inline-box">
              <img src="../assets/icon/power.png" alt="" width="22px">
              <span style="font-size: 15px;color: #a6a6a6;margin-left: 5px;margin-bottom: 5px">当月用电</span>
            </div>
            <div class="inline-box">
              <img src="../assets/icon/money.png" alt="" width="22px">
              <span style="font-size: 15px;color: #a6a6a6;margin-left: 5px;margin-bottom: 5px">剩余电费</span>
            </div>
          </div>
          <div class="data" style="display: flex;flex-direction: row;justify-content: space-around">
            <div class="inline-box">
              <span style="font-size:20px;color: rgba(246, 146, 70, 0.96);font-weight: 600">{{ this.powerCost.cost }}</span>
              <span style="font-size:15px;color: #a6a6a6;margin-left: 5px">度</span>
            </div>
            <div class="inline-box">
              <span style="font-size:20px;color: rgba(246, 146, 70, 0.96);font-weight: 600">{{ this.powerCost.amount }}</span>
              <span style="font-size:15px;color: #a6a6a6;margin-left: 5px">元</span>
            </div>
          </div>
          <div class="appendix" style="margin-top: 50px;text-align: center">
            <div style="font-size: 15px;color: #a6a6a6">统计截至今日</div>
          </div>
        </div>
      </div>
      <div class="six item" style="padding:10px">
        <div class="title">投诉和留言</div>
        <el-input
            v-model="textarea"
            :rows="5"
            type="textarea"
            placeholder="请输入您的建议或投诉"
        />
        <el-button :dark="isDark"
                   style="height: 20%;margin-top: 10px;width: 50%;background-color: #43cf7c;border: 0;color: white;margin: 10px 25% auto 25%">投诉
        </el-button>
      </div>
    </div>
  </div>
  <div class="footer">
  </div>
</template>

<script>

import HomeHeader from '../components/HomeHeader'
import * as echarts from 'echarts';
import {More, LocationInformation, Coin} from '@element-plus/icons-vue'
import request, {getRequest, postRequest} from "@/utils/request";

export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    More,
    LocationInformation,
    Coin
  },
  created() {
    // var userJsonStr = sessionStorage.getItem('User');
    // var Token = localStorage.getItem("Authorization");
    // this.ThisUser = userJsonStr;//JSON.parse(userJsonStr)
    // this.token = Token;
    // console.log(this.ThisUser);
    // console.log(this.token);
  },
  mounted() {
    // this.getUserInfo();
    this.getAnnouce();
    this.getPowerCost();
    this.getWaterCost();
    this.getPostApplication();
    this.getOtherInfo();
  },
  data(){
    return{
      ThisUser:{},
      form:{
      },
      // userInfo:{},
      userInformation:{},
      annouce:{},
      powerCost:{},
      waterCost:{},
      postApplication:{},
      visible: false,
      address:'16321',
      studentId: '2020211372',
      token:'',
    }
  },
  methods: {
    goToAnnounceMent() {
      this.$router.push('/Announcement')
    },
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
    getWaterCost(){
      getRequest('/dor/info/water').then(res =>{
        if (res.success) {
          this.waterCost = res.data
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    getPowerCost(){
      getRequest('/dor/info/power').then(res =>{
        if (res.success) {
          this.powerCost = res.data
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    getAnnouce(){
      postRequest('/dor/announce', {
        "page": 1,
        "pageSize": 99
      }).then(res => {
        if (res.success) {
            this.annouce=res.data.data
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    getPostApplication(){
      postRequest('/dor/work/info', {
        "page": 1,
        "pageSize": 99
      }).then(res => {
        if (res.success) {
          this.postApplication=res.data.data
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    save(){
      this.form.studentId=2020211372;
      this.form.address='16321';
      console.log(this.form)
      this.$router.push('/home')
      // request.post().then(res => {
      //   if (res.code === '0') {
      //     this.$message({
      //       type: "success",
      //       message: "提交报修成功"
      //     })
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: res.msg
      //     })
      //   }
      // })
    }
  }
}
</script>
<style scoped>

.container {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #f7f7f7;
  opacity: 0.9;
  height: 800px;
}

.wrapper {
  /* 声明一个容器 */
  display: grid;
  /* 声明列的宽度,数字3表示的重复3次，即有3列宽度为200px*/
  grid-template-columns: repeat(3, 400px);
  /* 声明行间距和列间距 */
  grid-gap: 20px;
  /* 分别表示两行的高度 */
  grid-template-rows: 350px 280px;
}

.item {
  border-radius: 5px;
  font-size: 200%;
  text-shadow: #999999;
  color: #000000;
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(rgba(72, 217, 130, 0.2)));
  margin-bottom: 0px;
  margin-top: 10px;
}


.scrollbar-demo-item {
  display: flex;
  height: 25px;
  font-size: 16px;
  font-weight: 550;
  margin: 15px;
  padding-left: 5px;
  border-radius: 4px;
  background: #43cf7c;
  color: #ffffff;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.card-header {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: space-around;*/
}

.box-card {
  width: 400px;
}

.card {
  width: 100%;
  height: 200px;
  background-color: #FFFFFF;
}

.application {
  /*height: 200px;*/
  margin: 15px;
  border-radius: 4px;
  background-color: white;
}


.title {
  color: rgba(246, 146, 70, 0.96);
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}
</style>
