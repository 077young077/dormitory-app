<template>
  <div v-if="this.userInformation.sex == 0 || this.userInformation.sex == 1">
    <HomeHeader/>
  </div>
  <div class="bg">
    <div class="paper">
      <div class="header">
        <el-form :model="form" label-width="12px">
          <div class="title">
            个人信息完善
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
              学生专业
            </el-tag>
            <el-input disabled :placeholder='this.userInformation.major' />
            <!--            {{this.user.studentId}}-->
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              绑定楼栋
            </el-tag>
            <el-select v-model="form.building" clearable placeholder="选择楼栋">
              <el-option
                  v-for="item in buildings"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  @click="setBuilding(item.id)"
                  style="color: #a6a6a6;font-size: 18px;"
              />
            </el-select>
            <el-select v-model="form.room" clearable placeholder="选择寝室" v-if="this.flag">
              <el-option
                  v-for="item in building.rooms"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  style="color: #a6a6a6;font-size: 18px;"
              />
            </el-select>
          </el-form-item>
<!--          <el-alert title="输入寝室号，例如：16321/321" type="success" style="margin: 10px;"/>-->
          <el-form-item>
<!--            v-if="this.userInformation.sex"-->
            <el-radio-group v-model="form.sex" class="ml-4">
              <el-radio-button :label='0' size="large">男</el-radio-button>
              <el-radio-button :label='1' size="large">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="post"
                   style="background-color: darkseagreen;border: 0;margin: 10px 40%;width: 150px">
          完善
        </el-button>
      </div>
    </div>
  </div>

</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import {getRequest, postRequest} from "@/utils/request";

export default {
  name: "InfoFulfill",
  components: {
    HomeHeader
  },
  data() {
    return {
      buildings: [],
      form:{},
      userInformation:{},
      buildingId: null,
      building:{
        rooms: []
      },
      flag:false,
    }
  },
  mounted() {
    this.getInfo();
    this.getBuilding();
    console.log(this.buildings)
  },
  methods: {
    getBuilding(){
      getRequest('/dor/info/build').then(res=>{
        if (res.success) {
          this.buildings = res.data
          console.log(this.buildings)
        }
      })
    },
    post() {
      console.log(this.form)
      if (this.form.building != ''&&this.form.room !=''&&this.form.sex!=null){
        postRequest('/dor/user', {
          "buildingId":this.form.building,
          "roomId":this.form.room,
          "sex":this.form.sex
        }).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "提交信息成功",
            })
            this.$router.push('/home')
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      }else{
        this.$message({
          type: "error",
          message: "不能有空选项"
        })
      }
    },
    setBuilding(id){
      console.log(id)
      this.building = this.buildings.find(item => item.id == id)
      this.flag = true
    },
    getInfo() {
      getRequest('/dor/user/info').then(res => {
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
</style>