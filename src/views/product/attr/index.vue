<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/dashBord' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>平台属性管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下拉三级菜单 -->
    <el-card class="box-card" style="margin: 20px auto">
      <categorySelect
        @getCategoryId="getCategoryId"
        :isShow="!isShow"
      ></categorySelect>
    </el-card>
    <!-- 商品列表区域 -->
    <el-card class="box-card">
      <!-- 显示商品 -->
      <div v-show="isShow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!categoryId3"
          >添加商品</el-button
        >
        <el-table :data="attrInfoList" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="70px">
          </el-table-column>
          <el-table-column label="属性名称" prop="attrName"> </el-table-column>
          <el-table-column label="属性值列表" prop="attrValueList">
            <template v-slot="scope">
              <el-tag
                v-for="tag in scope.row.attrValueList"
                :key="tag.id"
                closable
                :type="tag.type"
                style="margin-left: 5px"
              >
                {{ tag.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="editAttr(scope.row)"
                >修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 显示添加、编辑页面 -->
      <div v-show="!isShow">
        <!-- 添加属性值 -->
        <el-form :inline="true" :model="addAttrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="输入属性名"
              v-model="addAttrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrInfoList"
          :disabled="!this.addAttrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShow = true">取消</el-button>
        <!-- 添加属性值表格 -->
        <el-table stripe :data="addAttrInfo.attrValueList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="name" label="属性值属性" width="width">
            <template v-slot="{ row, $index }">
              <el-input
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                size="mini"
                v-if="row.flag"
                @blur="look(row)"
                @keyup.native.enter="look(row)"
                :ref="$index"
              >
              </el-input>
              <span
                @click="editLook(row, $index)"
                style="display: block"
                v-else
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="width">
            <template v-slot="{ row, $index }">
              <el-popconfirm
                :title="`你确定要删除${row.valueName}吗？`"
                @confirm="removeAttrValue($index)"
              >
                <el-button
                  type="danger"
                  el-icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveAttr"
          :disabled="addAttrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShow = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'attr',
  data() {
    return {
      attrInfoList: [],
      categoryId3: '',
      isShow: true,
      // 添加属性值携带的属性
      addAttrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 0
      }
    }
  },
  methods: {
    async getCategoryId(categoryId) {
      const { categoryId1, categoryId2, categoryId3 } = categoryId
      this.categoryId3 = categoryId3
      const { data: res } = await this.$http.attr.getAttrInfoList(
        categoryId1,
        categoryId2,
        categoryId3
      )
      if (res.code === 200) {
        this.attrInfoList = res.data
      }
    },
    // 添加属性值
    addAttr() {
      // 表格框的显隐
      this.isShow = false
      this.addAttrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.categoryId3,
        categoryLevel: 3
      }
    },
    // 修改属性值
    editAttr(data) {
      this.isShow = false
      this.addAttrInfo = JSON.parse(JSON.stringify(data))
      this.addAttrInfo.attrValueList.forEach((item) => {
        this.$set(item, 'flag', false)
      })
    },
    // 添加属性值列表子项
    addAttrInfoList() {
      this.addAttrInfo.attrValueList.push({
        attrId: this.addAttrInfo.id,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.addAttrInfo.attrValueList.length - 1].focus()
      })
    },
    // 输入框变为值
    look(data) {
      // 判断添加的属性值是否为空值
      if (data.valueName.trim() === '') {
        this.$message.error('请输入正确的属性值名称')
        return
      }
      // 判断是否有重复的属性名
      const isRepeat = this.addAttrInfo.attrValueList.some((item) => {
        if (data !== item) {
          return data.valueName === item.valueName
        }
      })
      if (isRepeat) return
      data.flag = false
    },
    // 值变为输入框
    editLook(data, index) {
      data.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 删除商品属性值列表
    removeAttrValue(index) {
      this.addAttrInfo.attrValueList.splice(index, 1)
    },
    // 保存商品属性值
    async saveAttr() {
      this.addAttrInfo.attrValueList = this.addAttrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName !== '') {
            delete item.flag
            return true
          }
        }
      )
      const { data: res } = await this.$http.attr.getAddAttr(this.addAttrInfo)
      if (res.code === 200) {
        this.$message.success('保存成功')
        this.isShow = true
      } else {
        this.$message.error('保存失败')
      }
    }
  }
}
</script>

<style></style>
