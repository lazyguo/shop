<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size:20px">销售额类别占比</span>
      <el-radio-group  size="mini" v-model="radio">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div style="height:305px">
      <pieCharts></pieCharts>
    </div>
  </el-card>
</template>

<script>
import pieCharts from './pieCharts'
export default {
  components: {
    pieCharts
  },
  data() {
    return {
      radio: '全部渠道'
    }
  }
}
</script>

<style scoped>
.clearfix {
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}
</style>
