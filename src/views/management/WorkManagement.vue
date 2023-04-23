<template>
  <div style="padding: 10px">
    <!--    表格展示-->
    <div>
      <div style="display: flex;flex-direction: row;">
        <!--    搜索区-->
        <div style="margin: 10px 300px 0 10px;width: 40%;display: block;float: left">
          <el-button @click="exportExcel" style="background-color: #42b983;border-right: 100px;color: #FFFFFF">导出Excel</el-button>
        </div>
        <div style="margin: 10px 0;width: 50%;text-align:center;display: block;">
            <div>
              <el-select v-model="typeId" placeholder="选择报修类型" clearable>
                <el-option label="水电保修" value="1"></el-option>
                <el-option label="设施保修" value="2"></el-option>
                <el-option label="其他保修" value="3"></el-option>
              </el-select>
              <el-select v-model="status" placeholder="选择查询工单状态" clearable>
                <el-option label="已撤销" value="-1"></el-option>
                <el-option label="未处理" value="0"></el-option>
                <el-option label="已处理" value="1"></el-option>
              </el-select>
              <el-button @click="select">查询</el-button>
            </div>
        </div>
      </div>

      <el-table :data="tableData" border stripe style="width: 1290px;margin: 0" :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}" ref="table">
        <el-table-column prop="id" label="ID" width="100" sortable show-overflow-tooltip/>
        <el-table-column prop="title" label="标题" width="170" show-overflow-tooltip/>
        <el-table-column prop="content" label="内容" width="170" show-overflow-tooltip/>
        <el-table-column prop="user" label="申请学生" width="170" />
        <el-table-column prop="type" label="报修类型" width="170"/>
        <el-table-column prop="status" label="现在状态" width="170">
          <template v-slot="{ row }">
            {{ row.status === 0 ? '待处理' : row.status === 1 ? '已处理' : row.status === -1 ? '已撤销' : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="commitTime" label="申请时间" width="170"/>
        <el-table-column fixed="right"
                         label="操作"
                         width="170">
          <template #default="{row}">
            <span v-if="row.status === -1"><button style="background-color: #a6a6a6;border: 0;color: #FFFFFF;border-radius: 0.3em;height: 30px;width: 100px">已撤销</button></span>
            <button v-else-if="row.status === 0" @click="handleEdit(row)" style="background-color: rgba(246, 146, 70, 0.96);border: 0;color: #FFFFFF;border-radius: 0.3em;height: 30px;width: 100px">操作</button>
            <span v-else><button style="background-color: #42b983;border: 0;color: #FFFFFF;border-radius: 0.3em;height: 30px;width: 100px">已处理</button></span>
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
                <el-radio :label="0" disabled>未处理</el-radio>
                <el-radio :label="1">已处理</el-radio>
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
import {postRequest, putRequest} from "@/utils/request";
import * as XLSX from "xlsx";

export default {
  name: "WorkManagement",
  data(){
    return{
      form: {},
      dialogVisible: false,
      search: '',
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSize: 8,
      typeId: null,
      status: null,
    }
  },
  mounted() {
    this.getWorkList()
  },
  computed: {
    // 根据status值和id值生成操作列内容
    getStatusText() {
      return function(status, row) {
        if (status === -1) {
          return '已撤销'
        } else if (status === 0) {
          return [
            h('el-button', { onClick: () => this.handleEdit(row) }, '按钮')
          ]
        } else if (status === 1) {
          return '已处理'
        }
      }
    }
  },
  methods:{
    exportExcel() {
      const sheet = XLSX.utils.table_to_sheet(this.$refs.table.$el);
      const book = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, sheet, 'Sheet1');
      XLSX.writeFile(book, 'table-data.xlsx');
    },
    select(){
      postRequest('http://lizp.vip:5453/dor/pm/work',
          {
            "currentPage": this.currentPage,
            "pageSize": this.pageSize,
            "status": this.status,
            "typeId": this.typeId
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
    getWorkList(){
      postRequest('http://lizp.vip:5453/dor/pm/work',
      {
        "currentPage": this.currentPage,
          "pageSize": this.pageSize,
          "status": null,
          "typeId": 0
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
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    save() {
      putRequest("http://lizp.vip:5453/dor/pm/work", {
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
        this.getWorkList()//更新完刷新表格
        this.dialogVisible = false//关
      })
    },
  }
}
</script>

<style scoped>

</style>