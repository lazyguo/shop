<template>
  <div class="tradeMark-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/dashBord' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 添加商品 -->
      <el-button type="primary" icon="el-icon-plus" @click="showAddDiolog"
        >添加</el-button
      >
      <!-- 表格区域 -->
      <el-table :data="tradeList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="70px">
        </el-table-column>
        <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
        <el-table-column prop="logoUrl" label="品牌LOGO">
          <!-- 图片显示 -->
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.logoUrl"
              :fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- 修改商品内容 -->
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDiolog(scope.row)"
              >修改</el-button
            >
            <!-- 删除商品 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteTrade(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加商品的弹出框 -->
    <el-dialog
      title="添加商品"
      :before-close="closeDiolog"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <!-- 表单信息 -->
      <el-form
        :model="queryInfo"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="queryInfo.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo">
          <el-upload
            class="avatar-uploader"
            action="http://39.98.123.211/admin/product/fileUpload"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="queryInfo.logoUrl"
              :src="queryInfo.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-form>
      <!-- 商品logo -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDiolog">取 消</el-button>
        <el-button type="primary" @click="confirmDiolog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tradeMark',
  data() {
    return {
      // 商品管理数据存储
      tradeList: [],
      // 当前页
      currentPage: 1,
      // 每页显示
      pageSize: 3,
      // 总数据
      total: 0,
      // 图片站位格式
      fit: 'scale-down',
      // 添加数据条件
      queryInfo: {
        tmName: '',
        logoUrl: ''
      },
      // 添加商品弹框显隐
      addDialogVisible: false
    }
  },
  mounted() {
    this.getTrade()
  },
  methods: {
    // 请求商品数据
    async getTrade() {
      const { currentPage, pageSize } = this
      const result = await this.$http.tradeMark.getTradeList(
        currentPage,
        pageSize
      )
      const res = result.data
      if (res.code === 200) {
        this.tradeList = res.data.records
        this.total = res.data.total
      } else {
        this.$message.error('数据请求失败')
      }
    },
    // 切换当前页
    handleCurrentChange(newpage) {
      this.currentPage = newpage
      this.getTrade()
    },
    // 切换每页显示数据条数
    handleSizeChange(newPages) {
      this.pageSize = newPages
      this.getTrade()
    },
    // 添加商品
    showAddDiolog() {
      this.addDialogVisible = true
    },
    // 图片
    handleAvatarSuccess(res, file) {
      this.queryInfo.logoUrl = res.data
      console.log(res)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 关闭对话框
    closeDiolog() {
      this.$refs.addForm.resetFields()
      this.queryInfo.tmName = ''
      this.queryInfo.logoUrl = ''
      this.addDialogVisible = false
    },
    // 确认对话框
    async confirmDiolog() {
      const { data: res } = await this.$http.tradeMark.addEditTrade(
        this.queryInfo
      )
      if (res.code === 200) {
        console.log(res)
        if (this.queryInfo.id) {
          this.$message.success('修改商品成功')
        } else {
          this.$message.success('添加商品成功')
        }
        this.getTrade()
      } else {
        if (this.queryInfo.id) {
          this.$message.error('修改商品失败')
        } else {
          this.$message.error('添加商品失败')
        }
      }
      this.addDialogVisible = false
    },
    // 修改商品
    showEditDiolog(data) {
      this.queryInfo = { ...data }
      this.addDialogVisible = true
    },
    // 删除商品
    deleteTrade(data) {
      this.$messageBox('是否要删除此商品信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.tradeMark.deleteTrade(data.id)
          if (res.code === 200) {
            this.getTrade()
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
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 178px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload__tip {
  margin-left: 105px;
}
</style>
