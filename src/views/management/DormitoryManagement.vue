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
      <el-table :data="tableDataWithIndex" border stripe style="width: 1290px;margin: 0" :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
        <el-table-column prop="index" label="序号" width="80" sortable show-overflow-tooltip/>
        <el-table-column prop="building" label="楼栋" width="436"/>
        <el-table-column prop="room" label="房间" width="258"/>
        <el-table-column prop="member" label="人员数量" width="258"/>
        <el-table-column fixed="right"
                         label="操作"
                         width="258">
          <template #default="{ row }">
            <el-button @click="handleLook(row.id)" style="background-color: darkseagreen;border: 0;color: #FFFFFF">查看寝室状态</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer v-model="drawerVisible" title="寝室信息">
        <el-descriptions
            direction="vertical"
            :column="2"
            :size="size"
            border
        >
<!--          <el-descriptions-item label="寝室号id">{{ this.dorData.id}}</el-descriptions-item>-->
          <el-descriptions-item label="寝室地址" :span="2">{{this.dorData.building}}  {{dorData.room}}</el-descriptions-item>
          <el-descriptions-item label="寝室成员数">{{ this.dorData.member}}</el-descriptions-item>
          <el-descriptions-item label="寝室本周得分">{{this.dorData.score}}</el-descriptions-item>
          <el-descriptions-item label="水费">
            <el-tag size="small" type="warning" v-if="this.dorData.waterRate < 0">已欠费</el-tag>
            <el-tag size="small" type="success" v-else>未欠费</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="电费">
            <el-tag size="small" type="warning" v-if="this.dorData.powerRate < 0">已欠费</el-tag>
            <el-tag size="small" type="success" v-else>未欠费</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="成员">
            <div  v-for="(item,index) in this.members " :key="item" style="display: flex;">
              <span>
                <img src="../../assets/img/man.png" alt="" width="80" height="80">
              </span>
              <span>
                <div>
                学号：{{item.id}}
              </div>
              <div>
                姓名：{{item.name}}
              </div>
              <div>
                专业：{{item.major}}
              </div>
              </span>
            </div>
          </el-descriptions-item>
        </el-descriptions>
    </el-drawer>
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
    this.getUserAuth()
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
      drawerVisible: false,
      dorData:[],
      members:[],
    }
  },
  computed: {
    tableDataWithIndex() {
      return this.tableData.map((item, index) => ({
        ...item,
        index: (this.currentPage - 1) * this.pageSize + index + 1
      }));
    }
  },
  methods: {
    getUserAuth(){
      if(!localStorage.getItem('Authorization')){
        this.$router.push("/ManagerLogin")
      }else {
        this.getRooms()
        this.getBuildings()
      }
    },
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
    handleLook(id) {
      this.drawerVisible = true
      console.log(this.drawerVisible)
      API2.getRequest('/dor/pm/info/'+id).then(res => {
        if (res.success) {
          this.dorData = res.data
          this.members = res.data.users
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
.title{
  color: #42b983;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 25px;
  font-weight: 800;
}
</style>