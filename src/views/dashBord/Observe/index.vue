<template>
  <div>
    <el-row :gutter="10">
      <!-- 左边 -->
      <el-col :span="12">
        <search></search>
      </el-col>
      <!-- 右边 -->
      <el-col :span="12">
        <category></category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import category from './category'
import search from './search'
export default {
  name: 'observe',
  components: {
    category,
    search
  }
}
</script>

<style></style>
