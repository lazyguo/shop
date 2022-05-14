<template>
  <div>
    <div class="header">
      <span style="margin-right:15px">搜索用户数</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="main" style="margin:12px 0">
      <span style="margin-right:22px">123506</span>
      <div style="display:inline-block;font-size:14px">
        <span>17.1</span>
        <i class="el-icon-caret-top" style="color:red"></i>
      </div>
    </div>
    <div class="footer" style="height:70px">
      <lineCharts></lineCharts>
    </div>
  </div>
</template>

<script>
import lineCharts from './lineDate'
export default {
  components: {
    lineCharts
  }
}
</script>

<style scoped>
  .header {
    color: rgb(190, 190, 190);
    font-size: 16px;
  }
</style>
