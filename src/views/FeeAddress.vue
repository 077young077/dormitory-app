<template>
  <div>
    <HomeHeader/>
  </div>
  <div class="bg">
    <div class="paper">
      <div class="header">
        <el-form :model="form" label-width="12px">
          <div class="title">
            寝室费用缴纳
          </div>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              学生姓名
            </el-tag>
            <el-input disabled :placeholder='this.userInformation.name' />
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              学生学号
            </el-tag>
            <el-input disabled :placeholder='this.userInformation.id' />
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              学生寝室
            </el-tag>
            <el-input disabled :placeholder='this.userInformation.building + this.userInformation.room' />
          </el-form-item>
          <el-alert title="请在确认寝室信息后缴纳费用，费用缴纳成功，请点击下方按钮刷新页面" type="success" style="margin: 10px;"/>
          <div class="inline-box">
            <div class="block">
              <div style="margin-bottom: 5px" class="title"><span style="margin-right: 10px">寝室用水数据</span></div>
              <el-descriptions title="" style="background-color: #FFFFFF;padding: 10px;color: #a6a6a6" direction="vertical"
                               border>
                <el-descriptions-item label="当前水费">{{ this.waterCost.amount }} ￥</el-descriptions-item>
                <el-descriptions-item label="用水量">{{ this.waterCost.cost }} L</el-descriptions-item>
                <el-descriptions-item label="状态">
                  <el-tag size="small" type="warning" v-if="this.waterCost.overdue">已欠费</el-tag>
                  <el-tag size="small" type="success" v-else>未欠费</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <div class="appendix"
                   style="margin-top: 50px;margin-top: 0;background-color: #FFFFFF;height: 50px;text-align: center">
                <div style="font-size: 15px;color: #a6a6a6">统计截至今日</div>
              </div>
              <el-popover
                  ref="popover"
                  placement="right"
                  title="水费缴纳"
                  :width="430"
                  trigger="focus"
              >
                <img src="../assets/img/payment.jpeg" alt="" width="400">
                <template #reference>
                  <el-button
                      style="background-color: #43cf7c;color: #FFFFFF;border: 0;width: 100px">缴费</el-button>
                </template>
              </el-popover>
            </div>
            <div class="block">
              <div style="margin-bottom: 5px" class="title"><span style="margin-right: 10px">寝室用电数据</span></div>
              <el-descriptions title="" style="background-color: #FFFFFF;padding: 10px;color: #a6a6a6" direction="vertical"
                               border>
                <el-descriptions-item label="当前水费">{{ this.powerCost.amount }} ￥</el-descriptions-item>
                <el-descriptions-item label="用水量">{{ this.powerCost.cost }} L</el-descriptions-item>
                <el-descriptions-item label="状态">
                  <el-tag size="small" type="warning" v-if="this.powerCost.overdue">已欠费</el-tag>
                  <el-tag size="small" type="success" v-else>未欠费</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <div class="appendix"
                   style="margin-top: 50px;margin-top: 0;background-color: #FFFFFF;height: 50px;text-align: center">
                <div style="font-size: 15px;color: #a6a6a6">统计截至今日</div>
              </div>
              <el-popover
                  ref="popover"
                  placement="right"
                  title="电费缴纳"
                  :width="430"
                  trigger="focus"
              >
                <img src="../assets/img/payment.jpeg" alt="" width="400">
                <template #reference>
                  <el-button
                    style="background-color: #43cf7c;color: #FFFFFF;border: 0;width: 100px">缴费</el-button>
                </template>
              </el-popover>
            </div>
          </div>
          <el-button
              style="background-color: #43cf7c;color: #FFFFFF;border: 0;width: 200px" @click="refresh">刷新余额</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {API1} from "@/utils/request";
import HomeHeader from "@/components/HomeHeader";
export default {
  name: "FeeAddress",
  components:{
    HomeHeader,
  },
  data(){
    return{
      userInformation:{},
      waterCost:{},
      powerCost:{},
      form:{}
    }
  },
  mounted() {
    this.getInfo();
    this.getPowerCost();
    this.getWaterCost();
  },
  methods:{
    getInfo(){
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
    getWaterCost() {
      API1.getRequest('/dor/info/water').then(res => {
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
    getPowerCost() {
      API1.getRequest('/dor/info/power').then(res => {
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
    refresh(){
      this.$router.go(0)
    }
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
  margin: 30px 250px 30px 250px;
}


li {
  font-weight: 500;
  color: white;
  font-size: 25px;
}
.title{
  font-size: 26px;
  font-weight: 600;
  color: #43cf7c;
  text-align: center;
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
.inline-box{
  display: flex;
  flex-direction: row;
}
.block{
  width: 50%;
  margin: 10px 5%;
  padding: 10px;
}
</style>