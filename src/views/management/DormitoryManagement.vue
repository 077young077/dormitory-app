<template>
  <div>
  </div>
  <div style="padding: 10px">
<!--    <div class="title">-->
<!--      寝室数据可视化展示-->
<!--      <div>-->

<!--      </div>-->
<!--    </div>-->
    <!--    表格展示-->
    <div>
<!--      {{this.buildingData}}-->
      <div style="display: flex;flex-direction: row;">
        <span class="title" style="margin: 10px 300px 0 10px;">
          寝室数据表格展示
        </span>
        <!--    搜索区-->
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
                :cell-style="{'text-align':'center'}">
        <el-table-column prop="id" label="寝室ID" width="258" sortable/>
        <el-table-column prop="building" label="楼栋" width="258"/>
        <el-table-column prop="room" label="房间" width="258"/>
        <el-table-column prop="member" label="人员数量" width="258"/>
        <el-table-column fixed="right"
                         label="操作"
                         width="258">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" >编辑</el-button>
            <el-popconfirm title="确定删除？" @confirm="handleDelete(scope.row.id)"
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
import {API2} from '@/utils/request'


export default {
  name: "DormitoryManagement",
  mounted() {
    this.getRooms()
    this.getBuildings()
  },
  data(){
    return{
      form: {},
      dialogVisible: false,
      search: '',
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSize: 8,
      powerArrears: 0,
      waterArrears:0,
      buildingData:[],
      roomData:[],
      selectRoom:'',
      buildingId: '',
      roomId:'',
    }
  },
  computed(){

  },
  methods: {
    getBuildings(){
      API2.getRequest('/dor/pm/info/build').then(res => {
        if (res.success) {
          this.buildingData =res.data
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
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
    getRooms() {
      API2.postRequest('/dor/pm/info', {
        "buildingId": 0,
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "powerArrears": 0,
        "roomId": 0,
        "waterArrears": 0
      }).then(res => {
        if (res.success) {
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
    select(){
      API2.postRequest('/dor/pm/info', {
        "buildingId": this.buildingId,
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "powerArrears": 0,
        "roomId": this.roomId,
        "waterArrears": 0
      }).then(res => {
        if (res.success) {
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
      this.getRooms()
    },
    handleSizeChange(pageSize) {//改变每页数
      this.pageSize = pageSize
      this.getRooms()
    },
  }
}

</script>

<style scoped>
.title{
  color: #42b983;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 25px;
  font-weight: 800;
}
</style>