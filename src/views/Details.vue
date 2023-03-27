<template>
  <div>
    <HomeHeader/>
  </div>
  <div class="paper">
<!--    <div class="img" style="justify-content: center;display: flex;flex-direction: row ">-->
<!--      <img :src="this.blogData.picture" alt="" style="width:60%;display: block;border: 2px solid #ffffff;border-radius: 15px;-->
<!--">-->
<!--    </div>-->
    <div class="header">
      <div class="title">
        {{ this.blogData.title }}
      </div>
      <div class="information">
        <div class="author">
          作者：{{ this.blogData.author }}
        </div>
        <div class="time">
          时间：{{ this.blogData.time }}
        </div>
        <div class="istransmit">
          是否转载：
          <span v-if="this.blogData.istransmit == '1'">是</span>
          <sapn v-else>否</sapn>
        </div>
      </div>
    </div>
    <el-divider>
    </el-divider>
    <div class="container">
      {{ this.blogData.content }}
    </div>
    <el-divider content-position="right">End-divider</el-divider>
    <div class="copyright">
      凡本网注明“转载:XXX”的作品，均转载自其它媒体，转载目的在于传递更多信息，并不代表本网赞同其观点和对其真实性负责。
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  components:{
    HomeHeader
  },
  data(){
    return{
      blogData:{},
      blogId:'',
      text:'',
    }
  },
  created() {
    this.getBlogId()

  },
  mounted() {
    this.getBlog(this.blogId)

  },
  methods:{
    getBlogId(){
      this.blogId = this.$route.query.id;
      console.log(this.blogId)
    },
    getBlog(id){
      request.get(''+id
      ).then(res => {
        this.blogData = res.data
        console.log(this.blogData)
      })
    },
  }
}
</script>

<style scoped>

</style>