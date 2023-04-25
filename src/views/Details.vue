<template>
  <div>
    <HomeHeader/>
  </div>
  <div class="bg">
    <div class="paper" >
      <div class="header">
        <div class="title">
          公告标题：{{ this.Data.title }}
        </div>
        <div class="information">
          <div class="author">
            发布者：{{ this.Data.publisher }}
          </div>
          <div class="time">
            时间：{{ this.Data.publishTime }}
          </div>
        </div>
      </div>
      <el-divider>
      </el-divider>
      <div class="container">
        {{ this.Data.content }}
      </div>
      <el-divider content-position="right" border-style="color: #a6a6a6;
"></el-divider>
      <div class="copyright">
        凡本系统“发布自:XXX”的作品，均转载自其它部门，转载目的在于给使用人员传递更多信息。
      </div>
    </div>
  </div>

</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import {API1} from "@/utils/request";

export default {
  name: "Details",
  components:{
    HomeHeader
  },
  data(){
    return{
      Data:{},
      Id:'',
      text:'',
    }
  },
  mounted() {
    this.getId()
    this.getData()
  },
  methods:{
    getId(){
      this.Id = this.$route.query.id;
      console.log(this.Id)
    },
    getData(){
      API1.getRequest('/dor/announce/'+this.Id).then(res => {
        this.Data = res.data
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
  margin: 20px 100px;
  padding: 20px 40px;
  line-height: 25px;
}


.title {
  margin-top: 10px;
  font-size: 40px;
  font-weight: 800;
  text-align: center;
  color: #a6a6a6;
}

.information {
  padding-left: 90px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  color: #a6a6a6;
}

.author {
  display: block;
  font-size: 20px;
  margin-right: 200px;
  font-weight: 600;
  color: #a6a6a6;
}

.time {
  color: #a6a6a6;
  display: block;
  font-size: 20px;
  margin-right: 200px;
  font-weight: 600;
}


.container{
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  font-size: 17px;
  color: #a6a6a6;
}
.copyright{
  padding-top: 20px;
  text-align: center;
  color: #8c939d;
  height: 80px;
}

li{
  font-weight: 500;
  color: white;
  font-size: 25px;
}
.bg{
  text-align: center;
  font-size: 20px;
  text-shadow: #999999;
  color: #000000;
  width: 100%;
  height: 100vh;
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(rgba(72, 217, 130, 0.2)));
}
</style>