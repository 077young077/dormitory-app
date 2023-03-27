<template>
  <div>
    <HomeHeader/>
  </div>
  <div class="bg">
    <div class="container">
      <div style="margin: 10px 0;width: 50%;text-align:center;display: block;float: right">
        <el-input v-model="search" style="width: 20%" placeholder="按公告查询"/>
        <el-button type="default" style="margin-left: 5px" @click="get">查询</el-button>
      </div>
      <el-table :data="announce" border stripe style="width: 100%;margin: 0" row-click="">
<!--        gotoAnnoucement(annouce.id)-->
        <el-table-column prop="id" label="ID" width="127" sortable/>
        <el-table-column prop="title" label="公告标题" width="688.8"/>
        <el-table-column prop="publisher" label="发起人" width="200"/>
        <el-table-column prop="publishTime" label="时间" width="200"/>
      </el-table>
      <div style="margin:10px 0">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5,8]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import {getRequest, postRequest} from "@/utils/request";

export default {
  name: 'Announcement',
  components: {
    HomeHeader
  },
  data(){
    return{
      search: '',
      currentPage: 1,
      total: 0,
      announce: [],
      pageSize: 8,
    }
  },
  mounted() {
    this.getAnnouce();
    console.log(this.announce)
  },
  methods:{
    handleCurrentChange(pageNum) {//改变页码
      this.currentPage = pageNum
      this.getAnnouce()
    },
    handleSizeChange(pageSize) {//改变每页数
      this.pageSize = pageSize
      this.getAnnouce()
    },
    getAnnouce(){
      postRequest('/dor/announce', {
        "page": this.currentPage,
        "pageSize": this.pageSize
      }).then(res => {
        if (res.success) {
          this.announce=res.data.data
          this.total=res.data.total
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    // gotoAnnoucement(id){
    //   this.$router.push('/details'+id)
    //   }
    },
}
</script>
<style scoped>
.container{
  margin: 10px 10%;
}
.bg{
  text-align: center;
  font-size: 200%;
  text-shadow: #999999;
  color: #000000;
  height: 100vh;
  margin: 20px auto 0 auto;
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(rgba(72, 217, 130, 0.2)));
}
</style>