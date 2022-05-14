<template>
  <div>
    <el-row :gutter="10">
      <!-- 1 -->
      <el-col :span="6">
        <el-card>
          <detail title="总销售额" count="￥15884">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.97%</span>
              <i class="el-icon-caret-top" style="color: red"></i>
              <span>日同比&nbsp;&nbsp;17.45%</span>
              <i class="el-icon-caret-bottom" style="color: green"></i>
            </template>
            <template slot="footer">
              <span>日销售额&nbsp;￥1425</span>
            </template>
          </detail>
        </el-card>
      </el-col>
      <!-- 2 -->
      <el-col :span="6">
        <el-card>
          <detail title="访问量" count="88664">
            <template slot="charts">
              <eChartsLine></eChartsLine>
            </template>
            <template slot="footer">
              <span>日访问量&nbsp;15425</span>
            </template>
          </detail>
        </el-card>
      </el-col>
      <!-- 3 -->
      <el-col :span="6">
        <el-card>
          <detail title="支付笔数" count="88460">
            <template slot="charts">
              <echartsBar></echartsBar>
            </template>
            <template slot="footer">
              <span>转化率&nbsp;%65</span>
            </template>
          </detail>
        </el-card>
      </el-col>
      <!-- 3 -->
      <el-col :span="6">
        <el-card>
          <detail title="运营活动效果" count="78%">
             <template slot="charts">
              <echartsBarLast></echartsBarLast>
            </template>
            <template slot="footer">
              <span>周同比&nbsp;&nbsp;12.11%</span>
              <i class="el-icon-caret-top" style="color: red"></i>
              <span>日同比&nbsp;&nbsp;9.88%</span>
              <i class="el-icon-caret-bottom" style="color: green"></i>
            </template>
          </detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import detail from './detail'
import eChartsLine from './line'
import echartsBar from './bar'
import echartsBarLast from './barLast'
export default {
  name: 'Card',
  components: {
    detail,
    eChartsLine,
    echartsBar,
    echartsBarLast
  }
}
</script>

<style>
</style>
