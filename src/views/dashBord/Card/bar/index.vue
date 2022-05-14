<template>
  <div class="echarts" ref="echarts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    let echartsLine = echarts.init(this.$refs.echarts)
    echartsLine.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [66, 10, 93, 53, 26, 84, 66, 4, 96],
          color: '#58d0d9'
        }
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      tooltip: {}
    })
  }
}
</script>

<style scoped>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
