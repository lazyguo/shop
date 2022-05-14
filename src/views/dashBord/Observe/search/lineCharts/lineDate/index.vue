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
          type: 'line',
          data: [66, 10, 54, 26, 16, 44, 36, 41, 86],
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: '#fcb8d3'
          },
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#fcb8d3'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ],
              global: false
            }
          }
        }
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
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
