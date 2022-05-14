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
        min: 0,
        max: 100

      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          color: '#fc5531',
          barWidth: 12,
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
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
