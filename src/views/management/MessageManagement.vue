<template>

  <div style="padding: 10px">
  <!--    表格展示-->
    <span class="title" style="margin: 10px 800px 10px 0">
      意见数据展示
    </span>
    <span>
      <el-button type="primary" @click="searchByStatus" style="background-color: #42b983;border: 0;height: 30px;margin-bottom: 10px">筛选未读意见</el-button>
      <el-button type="primary" @click="getSuggestions" style="background-color: #42b983;border: 0;height: 30px;margin-bottom: 10px">刷新</el-button>
    </span>
  <div>


    <el-table :data="tableDataWithIndex" border stripe style="width: 1290px;margin: 0" :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
      <el-table-column prop="index" label="序号" width="80" sortable/>
      <el-table-column prop="student" label="建议学生" width="150" />
      <el-table-column prop="content" label="建议内容" width="540" show-overflow-tooltip/>
      <el-table-column prop="commitTime" label="建议时间" width="190"/>
<el-table-column prop="status" label="状态" width="100" >
  <template v-slot="{ row }">
    {{ row.status === 1 ? '已读' : row.status === -1 ? '未读' : '' }}
  </template>
    </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="230">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" style="background-color: darkseagreen;border: 0;color: #FFFFFF">编辑意见状态</el-button>
          <el-popconfirm title="确定删除？" style="background-color: white;border: 0;color: black">
          <template #reference>
            <el-button type="danger" style="background-color: darkseagreen;border: 0;" @click="handleDelete">删除</el-button>
            <el-alert title="您没有管理员权限" type="success"/>
          </template>
        </el-popconfirm>
        </template>

      </el-table-column>
    </el-table>
    <div style="margin:10px 0">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5,10,20]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
      <el-dialog
          v-model="dialogVisible"
          title="编辑意见状态"
          width="30%"
      >
        <el-form :model="form" label-width="12px">
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              更改状态：
            </el-tag>
            <el-radio-group v-model="form.status">
            <el-radio :label="1">已读</el-radio>
            <el-radio :label="-1">未读</el-radio>
          </el-radio-group>
          </el-form-item>

        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save" style="background-color: darkseagreen;border: 0;color: white">
          确定
        </el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</div>
</template>

<script>
import {API2} from '@/utils/request'

export default {
  name: "MessageManagement",
  data(){
    return{
      form: {},
      dialogVisible: false,
      search: '',
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSize: 10,
      flag: 0
    }
  },
  computed: {
    tableDataWithIndex() {
      return this.tableData.map((item, index) => ({
        ...item,
        index: (this.currentPage - 1) * this.pageSize + index + 1
      }));
    },
  },
  mounted() {
    this.getSuggestions()
  },
  methods:{
    handleDelete() {
      this.$message({
        type: "error",
        message: "暂未开放删除功能"
      })
      // console.log(id)
      // API2.deleteRequest("" + id).then(res => {
      //   if (res.success) {
      //     this.$message({
      //       type: "success",
      //       message: "删除成功"
      //     })
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: res.msg
      //     })
      //   }
      //   this.getSuggestions()//删完重载
      // })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    save() {
      API2.putRequest("/dor/pm/sug", {
          "id": this.form.id,
          "status": this.form.status
        }).then(res => {
          console.log(res)
          if (res.success) {
            this.$message({
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.getSuggestions()//更新完刷新表格
          this.dialogVisible = false//关
        })
    },
    getSuggestions(){
      API2.postRequest('/dor/pm/sug',{
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "status": null
      }).then(res => {
        if (res.success) {
          this.tableData = res.data.data
          this.total=res.data.total
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
      this.getWorkList()
    },
    handleSizeChange(pageSize) {//改变每页数
      this.pageSize = pageSize
      this.getWorkList()
    },
    searchByStatus(){
      API2.postRequest('/dor/pm/sug',{
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "status": -1
      }).then(res => {
        if (res.success) {
          this.tableData = res.data.data
          this.total=res.data.total
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.title{
  margin-bottom: 10px;
  margin-left: 10px;
  color: #42b983;
  font-size: 25px;
  font-weight: 800;
}
</style>