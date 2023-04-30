<template>
<div>
  <el-menu
      default-active="user"
      class="el-menu-vertical-demo"
      style="width: 200px; min-height: calc(100vh - 50px)"
      router
      active-text-color="darkseagreen"
  >
    <el-menu-item index="AnnouncementManagement" >
      <el-icon><EditPen /></el-icon>
      <span>公告管理</span>
    </el-menu-item>
    <el-menu-item index="UserManagement">
      <el-icon><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="FeeController" >
      <el-icon><CreditCard /></el-icon>
      <span>费用管理</span>
    </el-menu-item>
    <el-menu-item index="DormitoryManagement" >
      <el-icon><PieChart /></el-icon>
      <span>寝室管理</span>
    </el-menu-item>
    <el-menu-item index="MessageManagement" >
      <el-icon><ChatLineSquare /></el-icon>
      <span>意见管理</span>
    </el-menu-item>
    <el-menu-item index="WorkManagement" >
      <el-icon><Message /></el-icon>
      <span>报修管理</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  User,
  EditPen,
  PieChart,
  House,
  ChatLineSquare,
  Plus,
  Minus,
  CreditCard,
  Message
} from '@element-plus/icons-vue'
export default {
  name: "Aside",
  components:{
    Message,
    User,
    EditPen,
    Document,
    IconMenu,
    Location,
    Setting,
    PieChart,
    House,
    ChatLineSquare,
    Plus,
    Minus,
    CreditCard
  }
}

</script>

<style scoped>

</style>