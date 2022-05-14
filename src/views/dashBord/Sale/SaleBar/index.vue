<template>
  <div class="echarts" ref="echarts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    let echartsLine = echarts.init(this.$refs.echarts)
    echartsLine.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '40%',
          data: [10, 52, 200, 334, 390, 330, 220, 100, 25, 100, 300, 20],
          color: '#99cc99'
        }
      ]
    })
  }
}
</script>

<style scoped>
  .echarts {
    width: 100%;
    height: 320px
  }
</style>
