<template>
  <div id="app">
    <!-- <p>
      If Element Plus is successfully added to this project, you'll see an
      <code v-text="'<el-button>'"></code>
      below
    </p>
    <el-button type="primary">el-button</el-button> -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },

}
</script>

<style>
body .el-table th.gutter{
  display: table-cell!important;
}
</style>
