<template>
  <div style="height: 50px;line-height: 50px;border-bottom: 1px solid #ccc;display: flex">
    <div style="width: 400px; padding-left: 30px;font-weight: bold;color: #42b983;font-size: 30px">智慧楼栋后台管理</div>
    <div style="flex: 1;"></div>
    <div style="width: 150px;padding-top:10px">
      <el-dropdown>
    <span class="el-dropdown-link" style="font-size: 18px; color:#42b983;font-weight:700;border: 0">
      {{Thisuser.username}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
<!--            <el-dropdown-item >个人信息</el-dropdown-item>-->
<!--            <el-dropdown-item @click="$router.push('/about')">关于网站</el-dropdown-item>-->
            <el-dropdown-item @click="$router.push('/login')">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {ArrowDown} from '@element-plus/icons-vue'
export default {
  name: "Header",
  components: {
    ArrowDown
  },
  data(){
    return{
      Thisuser:{}
    }
  },
  props: ['user'],
  created() {
    let str =sessionStorage.getItem("User") || "{}"
    this.Thisuser=JSON.parse(str)
    console.log(this.user)
  }
}
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: darkseagreen;
  display: flex;
  align-items: center;
}
.head .header .el-dropdown-link:focus {
  outline: 0;
}
</style>