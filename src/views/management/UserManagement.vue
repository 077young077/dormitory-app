<template>
  <div style="padding: 10px">
    <!--    表格展示-->
    <div>
      <div style="display: flex;flex-direction: row;">
        <!--    功能区-->
        <span style="margin: 10px 0;width: 20%;text-align:left;display: block">
<!--          <el-button type="primary" @click="add" style="background-color: #42b983;border: 0">新增</el-button>-->
          <el-button type="primary" @click="exportExcel" style="background-color: #42b983;border: 0">导出Excel</el-button>
        </span>
        <!--    搜索区-->
        <span style="margin: 10px 0;width: 40%;">
          <el-input v-model="idSearch" style="width: 70%" placeholder="按用户学号查询"/>
          <el-button type="default" style="margin-left: 5px" @click="getById">查询</el-button>
        </span>
        <span style="margin: 10px 0;width: 50%;text-align:center;display: block;">
          <el-select
              v-model="this.buildingId"
              placeholder="选择查询寝室的楼栋"
              style="width: 240px"
              @change="getBuildingRooms(this.buildingId)"
              clearable
          >
            <el-option
                v-for="item in buildingData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
          <el-select
              v-model="this.roomId"
              placeholder="查询楼栋下的寝室"
              style="width: 240px"
              clearable
          >
            <el-option
                v-for="item in roomData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
          <el-button @click="select">查询</el-button>
        </span>
      </div>

      <el-table :data="tableData" border stripe style="width: 1290px;margin: 0" :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}" ref="table">
        <el-table-column prop="id" label="ID" width="140" sortable/>
        <el-table-column prop="name" label="学生姓名" width="175"/>
        <el-table-column prop="sex" label="性别" width="175">
          <template v-slot="{ row }">
          {{ row.sex === 0 ? '男' : row.sex === 0 ? '女' : '' }}
        </template>
        </el-table-column>
        <el-table-column prop="major" label="专业" width="175"/>
        <el-table-column prop="building" label="地址" width="175"/>
        <el-table-column prop="room" label="寝室号" width="175"/>
        <el-table-column prop="score" label="寝室卫生得分" width="125"/>
        <!--        <el-table-column prop="school" label="学校" width="150"/>-->
        <el-table-column fixed="right"
                         label="操作"
                         width="150">
          <template #default="scope">
            <el-popconfirm title="确定删除？" @confirm="showMessageBox(scope.row.id)"
                           style="background-color: darkseagreen;border: 0;">
              <template #reference>
                <el-button type="danger" style="background-color: darkseagreen;border: 0;">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:10px 0">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5,10]"
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
import {API2} from '@/utils/request'

import * as XLSX from 'xlsx'
import {ElMessageBox} from "element-plus";

export default {
  name: "UserManagement",
  data() {
    return {
      form: {},
      dialogVisible: false,
      idSearch: '',
      addressSearch: '',
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSize: 10,
      buildingData:[],
      roomData:[],
      buildingId:'',
      roomId:'',
    }
  },
  mounted() {
    this.getUserAuth()
  },
  methods: {
    getUserAuth(){
      if(!localStorage.getItem('Authorization')){
        this.$router.push("/ManagerLogin")
      }else {
        this.getUsers()
        this.getBuildings()
      }
    },
    getById(){
      API2.postRequest('/dor/pm/user', {
        "buildingId": "",
        "currentPage": this.currentPage,
        "majorId": 0,
        "pageSize": this.pageSize,
        "roomId": "",
        "username": this.idSearch
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    exportExcel() {
      const sheet = XLSX.utils.table_to_sheet(this.$refs.table.$el);
      const book = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, sheet, 'Sheet1');
      XLSX.writeFile(book, 'table-data.xlsx');
    },
    getUsers() {
      API2.postRequest('/dor/pm/user', {
        "buildingId": "",
        "currentPage": this.currentPage,
        "majorId": 0,
        "pageSize": this.pageSize,
        "roomId": "",
        "username": ""
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    getBuildings(){
      API2.getRequest('/dor/pm/info/build').then(res => {
        if (res.success) {
          this.buildingData =res.data
        }
      })
    },
    getBuildingRooms(id){
      console.log(id)
      API2.getRequest('/dor/pm/info/room/'+id).then(res => {
        if (res.success) {
          this.roomData = res.data
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    select(){
      API2.postRequest('/dor/pm/user', {
        "buildingId": this.buildingId,
        "currentPage": this.currentPage,
        "majorId": 0,
        "pageSize": this.pageSize,
        "roomId": this.roomId,
        "username": ""
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    handleCurrentChange(pageNum) {//改变页码
      this.currentPage = pageNum
      this.getAnnouce()
    },
    handleSizeChange(pageSize) {//改变每页数
      this.pageSize = pageSize
      this.getAnnouce()
    },
    showMessageBox(id) {
      ElMessageBox.confirm('再考虑考虑（删除该用户会删除其在数据库中所有信息）？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API2.deleteRequest("/dor/pm/user/" + id).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "删除成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.getUsers()//删完重载
        })
        // 用户点击确定按钮时执行的操作
        console.log('删除')
      }).catch(() => {
        // 用户点击取消按钮时执行的操作
        console.log('取消')
      });
    }
  },
}
</script>

<style scoped>

</style>