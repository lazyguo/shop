<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix" style="font-size: 20px">
      <span>线上热门搜索</span>

      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-more" style="cursor: pointer; font-size: 22px"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
        <el-col :span="12">
          <lineChartsLast></lineChartsLast>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%; margin-top: 15px" border>
        <el-table-column type="index" label="排名" width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="搜索关键词"
          sortable
          width="width"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户数"
          sortable
          width="width"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="周涨幅"
          sortable
          width="150"
          align="center"
        >
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="500" style="text-align:right"> </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineCharts from './lineCharts'
import lineChartsLast from './lineChartsLast'
export default {
  components: {
    lineCharts,
    lineChartsLast
  },
  data() {
    return {
      tableData: [{}]
    }
  }
}
</script>

<style>
.clearfix {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
</style>
