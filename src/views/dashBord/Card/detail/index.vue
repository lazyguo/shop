<template>
  <div>
    <div class="card-header">
      <span>{{title}}</span>
      <i class="el-icon-info" ></i>
    </div>
    <div class="card-contain">{{count}}</div>
    <div class="card-chart">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  props: ['title', 'count']
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #d9d9d9;
}
.card-contain {
  font-size: 30px;
  padding: 10px 0;
}
.card-chart {
  height: 30px;
  padding-bottom: 5px;
  font-size: 14px;
}
.card-footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
  height: 20px;
  font-size: 15px;
}

</style>
