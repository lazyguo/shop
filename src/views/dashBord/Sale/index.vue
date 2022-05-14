<template>
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <div slot="header" class="clearfix">
      <!-- 卡片左侧 -->
      <el-tabs class="tabLeft" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售量" name="sale"> </el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 卡片右侧 -->
      <div class="tabRight">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="data"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          size="mini"
          style="width: 200px"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 卡片下部分 -->
    <div class="text item">
      <el-row :gutter="10">
        <el-col :span="20">
          <echartsBar v-if="show == true"></echartsBar>
          <echartsBarLast v-else></echartsBarLast>
        </el-col>
        <el-col :span="4" style="height: 320px; font-size: 16px">
          <h3 class="fList">门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="circle">0</span>
              <span>肯德基</span>
              <span class="rigthNow">123,888</span>
            </li>
            <li>
              <span class="circle">1</span>
              <span>麦当劳</span>
              <span>112,225</span>
            </li>
            <li>
              <span class="circle">3</span>
              <span>大骨头</span>
              <span>100,565</span>
            </li>
            <li>
              <span>4</span>
              <span>海底捞</span>
              <span>95,584</span>
            </li>
            <li>
              <span>5</span>
              <span>大脸鸡排</span>
              <span>88,665</span>
            </li>
            <li>
              <span>6</span>
              <span>汉堡王</span>
              <span>44,552</span>
            </li>
            <li>
              <span>7</span>
              <span>杨国福</span>
              <span>33,254</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import echartsBar from './SaleBar'
import echartsBarLast from './SaleBarLast'
import dayjs from 'dayjs'
export default {
  name: 'Sale',
  components: {
    echartsBar,
    echartsBarLast
  },
  data() {
    return {
      activeName: 'sale',
      // 收集日历数据
      data: [],
      show: true
    }
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  methods: {
    setDay() {
      let day = dayjs().format('YYYY-MM-DD')
      this.data = [day, day]
    },
    setWeek() {
      let start = dayjs().day(1).format('YYYY-MM-DD')
      let end = dayjs().day(7).format('YYYY-MM-DD')
      this.data = [start, end]
    },
    setMonth() {
      let start = dayjs().startOf('month').format('YYYY-MM-DD')
      let end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.data = [start, end]
    },
    setYear() {
      let start = dayjs().startOf('year').format('YYYY-MM-DD')
      let end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.data = [start, end]
    },
    handleClick() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tabLeft {
  width: 100%;
}
.tabRight {
  position: absolute;
  right: 0;
}
.tabRight span {
  font-size: 14px;
  margin: 0 10px;
  cursor: pointer;
}
.tabRight span:hover {
  border-bottom: 1px solid #333;
}
.charts {
  width: 100%;
  height: 100%;
}
ul {
  list-style: none;
  width: 100%;
  height: 320px;
  padding: 0;
}
li {
  height: 11%;
  display: flex;
  justify-content: space-between;
}
.fList {
  display: flex;
  justify-content: flex-start;
}
li span {
  margin-right: 20px;
}
.circle {
  width: 20px;
  height: 20px;
  background-color: black;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 20px;
  margin-right: 20px;
}
</style>
