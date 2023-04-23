<template>
  <div>
    <span style="display: flex;flex-direction: row;">
      <!--    搜索区-->
      <span class="title" style="margin: 10px 800px 10px 10px;">
      费用数据展示
    </span>
      <span style="margin: 10px 0">
        <el-select
            v-model="this.selectCondition"
            multiple
            placeholder="选择查询寝室的条件"
            style="width: 240px"
            @change="handleChange"
            @visible-change="handleVisibleChange"
        >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
<!--        <el-button style="margin-left: 5px;background-color: darkseagreen;border: 0;color: #FFFFFF" @click="search()">查询</el-button>-->
      </span>
    </span>

    <el-table :data="tableDataWithIndex" ref="table" border stripe style="width: 1290px;margin: 0;padding: 10px" :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
      <el-table-column prop="index" label="序号" width="215" sortable/>
      <el-table-column prop="building" label="楼栋" width="215"/>
      <el-table-column prop="room" label="房间" width="215"/>
      <el-table-column prop="member" label="人员数量" width="215"/>
      <el-table-column prop="powerRate" label="电费" width="215"/>
      <el-table-column prop="waterRate" label="水费" width="180"/>
    </el-table>
    <div style="margin:10px 0;padding: 10px">
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
</template>

<script>
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {postRequest} from "@/utils/request";

export default {
  name: "FeeController",
  mounted() {
    this.getFee()
  },
  data(){
    return{
      form: {},
      dialogVisible: false,
      search: '',
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSize: 10,
      powerArrears: 0,
      waterArrears:0,
      selectCondition: [],
      prevSelectedValue:[],
      options : [
        {
          value: 0,
          label: '欠水费',
        },
        {
          value: 1,
          label: '欠电费',
        },
          ]
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
    getFee(){
      postRequest('http://lizp.vip:5453/dor/pm/info',{
        "buildingId": 0,
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "powerArrears": this.powerArrears,
        "roomId": 0,
        "waterArrears": this.waterArrears
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
      this.getFee()
    },
    handleSizeChange(pageSize) {//改变每页数
      this.pageSize = pageSize
      this.getFee()
    },
    handleChange() {
      const selectCondition = this.selectCondition;
      this.triggerFunction(selectCondition);
      this.prevSelectedValue =selectCondition;
    },
    handleVisibleChange(visible) {
      if (visible && this.selectCondition.length === this.prevSelectedValue.length) {
        const isEqual = this.selectCondition.every(item => this.prevSelectedValue.includes(item));
        if (!isEqual) {
          const selectCondition = this.selectCondition;
          this.triggerFunction(selectCondition);
          this.prevSelectedValue = selectCondition;
        }
      }
    },
    triggerFunction(val){
      // 在这里调用需要触发的函数，将选中的值作为参数传递
      console.log(val);
      if(val[0] == 0){
        postRequest('http://lizp.vip:5453/dor/pm/info',{
          "buildingId": 0,
          "currentPage": this.currentPage,
          "pageSize": this.pageSize,
          "powerArrears": 0,
          "roomId": 0,
          "waterArrears": 1
        }).then(res => {
          if (res.success) {
            this.tableData = res.data.data
            this.total = res.data.total
            console.log('success')
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      }else if(val[0] == 1){
        postRequest('http://lizp.vip:5453/dor/pm/info',{
          "buildingId": 0,
          "currentPage": this.currentPage,
          "pageSize": this.pageSize,
          "powerArrears": 1,
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
      }else if(val.valueOf() == 0){
        postRequest('http://lizp.vip:5453/dor/pm/info',{
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
      }else{
        postRequest('http://lizp.vip:5453/dor/pm/info',{
          "buildingId": 0,
          "currentPage": this.currentPage,
          "pageSize": this.pageSize,
          "powerArrears": 1,
          "roomId": 0,
          "waterArrears": 1
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
      }
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