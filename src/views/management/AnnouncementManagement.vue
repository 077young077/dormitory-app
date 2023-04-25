<template>
  <div style="padding: 10px">
    <!--    表格展示-->
    <div style="display: flex;flex-direction: row;">
      <!--    功能区-->
      <div style="margin: 10px 0;width: 50%;text-align:left;display: block">
        <el-button type="primary" @click="add" style="background-color: #42b983;border: 0">新增</el-button>
      </div>
      <!--    搜索区-->
      <div style="display: flex;flex-direction: row;">
      <span>
        <el-input v-model="title" style="width: 100%" placeholder="输入公告标题"/>
        </span><span>
        <el-input v-model="publisher" style="width: 70%" placeholder="输入发布人"/>
        <el-button type="default" style="margin-left: 5px;background-color: darkseagreen;border: 0;color: #FFFFFF" @click="search">查询</el-button>
      </span>
        </div>
    </div>

    <el-table :data="tableDataWithIndex" border stripe style="width: 1290px;margin: 0" :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
      <el-table-column prop="index" label="序号" width="115" sortable/>
      <el-table-column prop="title" label="标题" width="245" show-overflow-tooltip/>
      <el-table-column prop="content" label="正文" width="285" show-overflow-tooltip/>
      <el-table-column prop="publisher" label="发布人" width="215"/>
      <el-table-column prop="publishTime" label="时间" width="215"/>
      <el-table-column fixed="right"
                       label="操作"
                       width="215">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="handleDelete(scope.row.id)"
                         style="background-color: darkseagreen;border: 0;">
            <template #reference>
              <el-button type="danger" style="background-color: darkseagreen;border: 0;">删除</el-button>
              <el-alert title="您没有管理员权限" type="success"/>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px 0">
      <el-pagination
          v-model:current-page="currentPage4"
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
      <el-dialog
          v-model="dialogVisible"
          title="编辑信息"
          width="30%"

      >
        <el-form :model="form" label-width="12px">
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              标题：
            </el-tag>
            <el-input v-model="form.title" style="width: 80%;display: block"/>
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              发布人：
            </el-tag>
            <el-input v-model="form.publisher" style="width: 80%;display: block"/>
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              内容：
            </el-tag>
            <el-input v-model="form.content" type="textarea" style="width: 80%;display: block"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save" style="background-color: darkseagreen;border: 0;">
          确定
        </el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {API2} from '@/utils/request'

export default {
  name: "AnnouncementManagement",
  data(){
    return{
      form: {},
      dialogVisible: false,
      publisher: '',
      title: '',
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSize: 10,
    }
  },
  mounted() {
    this.getAnnouce()
  },
  computed: {
    tableDataWithIndex() {
      return this.tableData.map((item, index) => ({
        ...item,
        index: (this.currentPage - 1) * this.pageSize + index + 1
      }));
    }
  },
  methods:{
    getAnnouce(){
      API2.postRequest('/dor/pm/notice', {
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "publisher": "",
        "title": ""
      }).then(res => {
        if (res.success) {
          this.tableData=res.data.data
          this.total=res.data.total
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    search(){
      if (this.title=='' && this.publisher ==''){
        this.$message({
          type: "error",
          message: "查询条件不满足，请输入查找条件"
        })
      }
      else {
        API2.postRequest('/dor/pm/notice', {
          "currentPage": this.currentPage,
          "pageSize": this.pageSize,
          "publisher": this.publisher,
          "title": this.title
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
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    handleCurrentChange(pageNum) {//改变页码
      this.currentPage = pageNum
      this.getAnnouce()
    },
    handleSizeChange(pageSize) {//改变每页数
      this.pageSize = pageSize
      this.getAnnouce()
    },
    handleDelete(id) {
      console.log(id)
      API2.deleteRequest("/dor/pm/notice/" + id).then(res => {
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
        this.getAnnouce()//删完重载
      })
    },
    add() {
      this.dialogVisible = true;
      this.form = {}
    },
    save() {
      //更新
      if (this.form.id) {
        API2.putRequest("/dor/pm/notice", {
          "publishTime": '',
          "id": this.form.id,
          "content": this.form.content,
          "publisher": this.form.publisher,
          "title": this.form.title
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
          this.getAnnouce()//更新完刷新表格
          this.dialogVisible = false//关
        })
      }//新增
      else {
        API2.postRequest("/dor/pm/notice/add", {
          "content": this.form.content,
          "publisher": this.form.publisher,
          "title": this.form.title
        }).then(res => {
          console.log(res)
          if (res.success) {
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.getAnnouce()//更新完刷新表格
          this.dialogVisible = false//关
        })
      }
    },
  }
}
</script>

<style scoped>

</style>