<template>
  <div style="padding: 10px">
    <!--    表格展示-->
    <div style="display: flex;flex-direction: row;">
      <!--    功能区-->
      <div style="margin: 10px 0;width: 50%;text-align:left;display: block">
        <el-button type="primary" @click="add" style="background-color: #42b983;border: 0">新增</el-button>
<!--        <el-button type="primary" style="background-color: #42b983;border: 0">导入</el-button>-->
<!--        <el-button type="primary" style="background-color: #42b983;border: 0">导出</el-button>-->
      </div>
      <!--    搜索区-->
      <div style="margin: 10px 0;width: 50%;text-align:center;display: block">
        <el-input v-model="search" style="width: 20%" placeholder="按地址查询"/>
        <el-button type="default" style="margin-left: 5px" @click="get">查询</el-button>
      </div>
    </div>

    <el-table :data="tableData" border stripe style="width: 1290px;margin: 0">
      <el-table-column prop="id" label="ID" width="215" sortable/>
      <el-table-column prop="title" label="标题" width="215"/>
      <el-table-column prop="content" label="正文" width="215"/>
      <el-table-column prop="proposalMan" label="发布人" width="215"/>
      <el-table-column prop="time" label="时间" width="215"/>
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
          title="编辑信息"
          width="30%"

      >
        <el-form :model="form" label-width="12px">
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              用户名：
            </el-tag>
            <el-input v-model="form.username" style="width: 80%;display: block"/>
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              昵称：
            </el-tag>
            <el-input v-model="form.nickname" style="width: 80%;display: block"/>
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              年龄：
            </el-tag>
            <el-input v-model="form.age" style="width: 80%;display: block"/>
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              性别：
            </el-tag>

            <el-radio label="男" size="large" v-model="form.sex" fill="darkseagreen">男</el-radio>
            <el-radio label="女" size="large" v-model="form.sex" fill="darkseagreen">女</el-radio>
            <el-radio label="保密" size="large" v-model="form.sex" fill="darkseagreen">保密</el-radio>
          </el-form-item>
          <el-form-item style="flex-direction: row">
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              地址：
            </el-tag>
            <el-input v-model="form.address" type="textarea" style="width: 80%;display: block"/>
          </el-form-item>
          <el-form-item>
            <el-tag
                style="text-align: center;display: block;margin-right: 10px; background-color: darkseagreen;border: 0;color: white;padding-top: 5px">
              头像：
            </el-tag>
            <el-upload
                action="" :on-success="fileUploadSuccess"
            >
              <el-button style="background-color: #42b983;border: 0;color: white">点击上传</el-button>
            </el-upload>
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
export default {
  name: "AnnouncementManagement",
  data(){
    return{
      form: {},
      dialogVisible: false,
      search: '',
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSize: 10,
    }
  },
  methods: {
    add() {

    }
  }
}
</script>

<style scoped>

</style>