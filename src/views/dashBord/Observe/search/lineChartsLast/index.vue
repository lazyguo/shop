<template>
  <div>
    <div class="header">
      <span style="margin-right:15px">人均搜索次数</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="main" style="margin:12px 0">
      <span style="margin-right:22px">66506</span>
      <div style="display:inline-block;font-size:14px">
        <span>37.1</span>
        <i class="el-icon-caret-bottom" style="color:green"></i>
      </div>
    </div>
    <div class="footer" style="height:70px">
      <lineCharts></lineCharts>
    </div>
  </div>
</template>

<script>
import lineCharts from './lineCharts'
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
