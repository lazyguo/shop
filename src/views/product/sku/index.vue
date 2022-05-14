<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/dashBord' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>sku</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 表格区域 -->
      <el-table style="width: 100%" :data="skuList">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="skuName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="skuDesc" label="描述" width="width">
        </el-table-column>
        <el-table-column prop="skuList" label="默认图片" width="width">
          <template v-slot="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量(千克)" width="100">
        </el-table-column>
        <el-table-column prop="price" label="价格(元)" width="100">
        </el-table-column>
        <el-table-column label="操作" width="width">
          <template v-slot="{ row }">
            <el-button
              type="success"
              icon="el-icon-top"
              size="mini"
              title="上架"
              v-if="row.isSale == 0"
              @click="onSaleSku(row)"
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-bottom"
              size="mini"
              title="下架"
              v-else
              @click="downSaleSku(row)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              title="修改"
              @click="editSaleSku"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-info"
              size="mini"
              title="显示信息"
              @click="showSaleSku(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              title="删除"
              @click="removeSaleSku(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="3"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        style="text-align: center"
      >
      </el-pagination>
    </el-card>
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="4">名称</el-col>
        <el-col :span="16">{{ skuAttrList.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">描述</el-col>
        <el-col :span="16">{{ skuAttrList.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">价格</el-col>
        <el-col :span="16">{{ skuAttrList.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="item in skuAttrList.skuAttrValueList"
            :key="item.id"
            >{{ item.skuId }}-{{ item.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">商品照片</el-col>
        <el-col :span="16">
          <el-carousel indicator-position="outside"  height="300px">
            <el-carousel-item v-for="item in skuAttrList.skuImageList" :key="item.id">
             <img :src="item.imgUrl" alt="" style="width:300px;height:300px">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'sku',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      skuList: [],
      skuAttrList: {},
      show: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取sku数据
    async getSkuList() {
      const { data: res } = await this.$http.sku.getSku(this.page, this.limit)
      if (res.code === 200) {
        this.skuList = res.data.records
        this.total = res.data.total
      }
    },
    // 每页最大数量显示
    handleSizeChange(newLimit) {
      this.limit = newLimit
      this.getSkuList()
    },
    // 当前第几页
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getSkuList()
    },
    // 上架商品
    async onSaleSku(row) {
      const { data: res } = await this.$http.sku.onSkuSale(row.id)
      if (res.code === 200) {
        row.isSale = 1
        this.$message.success('上架成功')
      } else {
        this.$message.error('上架失败')
      }
    },
    // 下架商品
    async downSaleSku(row) {
      const { data: res } = await this.$http.sku.downSkuSale(row.id)
      if (res.code === 200) {
        row.isSale = 0
        this.$message.success('下架成功')
      } else {
        this.$message.error('下架失败')
      }
    },
    // 修改商品
    editSaleSku() {
      this.$message.info('该功能正在开发中')
    },
    // 删除Sku商品
    async removeSaleSku(row) {
      const { data: res } = await this.$http.sku.deleteSkuSale(row.id)
      if (res.code === 200) {
        this.getSkuList()
        this.$message.success('删除商品成功')
      } else {
        this.$message.error('删除商品失败')
      }
    },
    // 显示sku数据
    async showSaleSku(row) {
      const { data: res } = await this.$http.sku.getSkuData(row.id)
      if (res.code === 200) {
        this.skuAttrList = res.data
        console.log(this.skuAttrList)
        this.show = true
      }
    }
  }
}
</script>

<style>
.el-row .el-col-4 {
  margin: 10px 0;
  font-size: 24px;
  text-align: right;
}
.el-row .el-col-16 {
  margin: 10px 10px;
  font-size: 24px;
}
</style>
