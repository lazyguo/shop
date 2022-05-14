<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/dashBord' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>spu</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下拉三级菜单 -->
    <el-card class="box-card" style="margin: 20px auto">
      <categorySelect
        @getCategoryId="getCategoryId"
        :isShow="toggleShow !== 0"
      ></categorySelect>
    </el-card>
    <!-- spu列表区域 -->
    <el-card class="box-card">
      <!-- 显示spu -->
      <div v-show="toggleShow == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!categoryId3"
          @click="addSpuData"
          >添加spu</el-button
        >
        <el-table stripe style="width: 100%" :data="spuList">
          <el-table-column type="index" label="序号" width="70px">
          </el-table-column>
          <el-table-column label="spu名称" prop="spuName" width="width">
          </el-table-column>
          <el-table-column label="spu描述" prop="description" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template v-slot="{ row }">
              <hint-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSkuData(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="editSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的全部sku列表"
                @click="showSpuData(row)"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
                @click="deleteSpu(row)"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 7]"
          :page-size="3"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          style="text-align: center"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="toggleShow == 1"
        @changeShow="changeShow"
        ref="Spu"
      ></SpuForm>
      <SkuForm
        v-show="toggleShow == 2"
        ref="Sku"
        @changeToggleShow="changeToggleShow"
      ></SkuForm>
    </el-card>
    <!-- 展示商品信息 -->
    <el-dialog
      :title="`${spu.spuName}的sku商品信息`"
      :visible.sync="dialogTableVisible"
    >
      <el-table :data="skuList"  v-loading="loading" border>
        <el-table-column property="skuName" label="名称"></el-table-column>
        <el-table-column property="price" label="价格"></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
        <el-table-column property="skuList" label="默认图片">
          <template v-slot="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  name: 'spu',
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      spuList: [],
      categoryId1: '',
      categoryId2: '',
      categoryId3: '',
      toggleShow: 0,
      currentPage: 1,
      pageSize: 3,
      total: 0,
      dialogTableVisible: false,
      spu: [],
      skuList: [],
      loading: true
    }
  },
  methods: {
    // 获取三级分类列表
    async getCategoryId(categoryId) {
      const { categoryId1, categoryId2, categoryId3 } = categoryId
      this.categoryId1 = categoryId1
      this.categoryId2 = categoryId2
      this.categoryId3 = categoryId3
      this.getSpuList()
    },
    // 获取spu的数据列表
    async getSpuList() {
      const { currentPage, pageSize, categoryId3 } = this
      const { data: res } = await this.$http.spu.getSpuList(
        currentPage,
        pageSize,
        categoryId3
      )
      if (res.code === 200) {
        this.spuList = res.data.records
        this.total = res.data.total
      } else {
        this.$message.error('数据获取失败')
      }
    },
    // 切换当前页
    handleCurrentChange(newpage) {
      this.currentPage = newpage
      this.getSpuList()
    },
    // 切换每页显示数据条数
    handleSizeChange(newPages) {
      this.pageSize = newPages
      this.getSpuList()
    },
    // 点击取消跳转回主界面
    changeShow({ toggleShow, flag }) {
      this.toggleShow = toggleShow
      if (flag === '修改') {
        // 重新获取数据
        this.getSpuList(this.page)
      } else {
        this.getSpuList()
      }
    },
    // 修改Spu事件
    editSpu(row) {
      this.toggleShow = 1
      this.$refs.Spu.getInitDate(row)
    },
    // 添加Spu商品
    addSpuData() {
      this.toggleShow = 1
      this.$refs.Spu.getAddSpuData(this.categoryId3)
    },
    // 删除spu商品事件
    async deleteSpu(row) {
      this.$messageBox('是否要删除此商品信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: deleteRes } = await this.$http.spu.deleteSpuData(
            row.id
          )
          if (deleteRes.code === 200) {
            this.getSpuList(
              this.spuList.length > 1 ? this.page : this.page - 1
            )
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加sku商品信息
    addSkuData(row) {
      this.toggleShow = 2
      this.$refs.Sku.getSkuData(this.categoryId1, this.categoryId2, row)
    },
    // sku界面跳转主界面
    changeToggleShow(toggleShow) {
      this.toggleShow = toggleShow
    },
    // 展示商品信息
    async showSpuData(row) {
      this.dialogTableVisible = true
      this.spu = row
      let { data: res } = await this.$http.spu.showSpuData(row.id)
      if (res.code === 200) {
        this.skuList = res.data
      }
    }
  }
}
</script>

<style></style>
