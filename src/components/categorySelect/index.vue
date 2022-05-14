<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="categoryList">
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryList.categoryId1"
          @change="handle1"
          :disabled="isShow"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in list"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryList.categoryId2"
          @change="handle2"
          :disabled="isShow"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryList.categoryId3"
          @change="handle3"
          :disabled="isShow"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'categorySelect',
  props: ['isShow'],
  data() {
    return {
      // 一级分类列表
      list: [],
      // 二级分类列表
      list2: [],
      // 三级分类列表
      list3: [],
      // 三级列表的id
      categoryList: {
        categoryId1: '',
        categoryId2: '',
        categoryId3: ''
      }
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    // 获取一级分类列表
    async getCategoryList() {
      const { data: res } = await this.$http.attr.getAttr1()
      if (res.code === 200) {
        this.list = res.data
      }
    },
    // 获取二级分类列表
    async handle1() {
      const { categoryId1 } = this.categoryList
      this.categoryList.categoryId2 = ''
      this.categoryList.categoryId3 = ''
      this.list2 = []
      this.list3 = []
      const { data: res } = await this.$http.attr.getAttr2(categoryId1)
      if (res.code === 200) {
        this.list2 = res.data
      }
    },
    // 获取三级分类列表
    async handle2() {
      const { categoryId2 } = this.categoryList
      this.categoryList.categoryId3 = ''
      this.list3 = []
      const { data: res } = await this.$http.attr.getAttr3(categoryId2)
      if (res.code === 200) {
        this.list3 = res.data
      }
    },
    handle3() {
      this.$emit('getCategoryId', this.categoryList)
    }
  }
}
</script>

<style></style>
