<template>
  <div class="role-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/dashBord' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-form inline>
        <el-form-item>
          <el-input
            placeholder="请输入用户名"
            style="width: 300px"
            v-model="tempSearchObj.roleName"
          ></el-input>
        </el-form-item>
        <el-button icon="el-icon-search" type="primary" style="margin: 0 10px" @click="searchRole"
          >查询</el-button
        >
        <el-button @click="resetSearch">清空</el-button>
      </el-form>

      <!-- 添加商品 -->
      <div style="margin: 15px 0">
        <el-button type="primary" icon="el-icon-plus" @click="addRole"
          >添加</el-button
        >
        <el-button type="danger" icon="el-icon-delete" @click="removeAll" :disabled="selectIds.length === 0">批量删除</el-button>
      </div>

      <!-- 表格区域 -->
      <el-table :data="roleList" stripe style="width: 100%" border  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="70px" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center">
          <template v-slot="{ row }">
            <span v-if ='row.show === false'>{{ row.roleName }}</span>
            <div v-else>
              <el-input
                type="text"
                v-model="row.roleName"
                size="mini"
                style="width: 200px; margin-right: 10px"
                ref="editInpt"
              />
              <el-button type="warning" icon="el-icon-refresh" size="mini" @click="cancel(row)"
                >取消</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot ={row}>
            <el-button
              type="info"
              title="分配角色"
              icon="el-icon-user-solid"
              size="mini"
               @click="pickRole"
            ></el-button>
            <el-button
              type="primary"
              title="修改用户"
              icon="el-icon-edit"
              size="mini"
              @click="editRole(row)"
              v-if="row.show === false"
            ></el-button>
            <el-button
              v-else
              type="success"
              title="确定"
              icon="el-icon-check"
              size="mini"
              @click="confirmEditRole(row)"
              >确定</el-button
            >
            <el-button
              type="danger"
              title="删除用户"
              icon="el-icon-delete"
              size="mini"
              @click="removeRole(row)"
            ></el-button>
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
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="total"
        style="text-align: center"
      >
      </el-pagination>
    </el-card>
    <!-- 添加功能 -->
    <el-dialog
      title=" 添加用户"
      :visible.sync="addDialogVisible"
      width="40%"
      :before-close="closeAddDiolog"
    >
      <el-form
        :model="addRuleForm"
        :rules="addUserRules"
        ref="addRuleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="roleName">
          <el-input v-model="addRuleForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDiolog">取 消</el-button>
        <el-button type="primary" @click="confirmAddDiolog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'role',
  data() {
    return {
      // 当前页
      currentPage: 1,
      // 每页展示条数
      pageSize: 3,
      // 总条数
      total: 0,
      // 存储角色用户所有数据
      roleList: [],
      // 搜索关键词
      tempSearchObj: { // 收集搜索条件数据
        roleName: ''
      },
      searchObj: { // 发送请求的条件参数数据
        roleName: ''
      },
      // 表单数据存储
      addRuleForm: {
        show: false
      },
      // 表单规则
      addUserRules: {
        roleName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      },
      // 添加表单显隐
      addDialogVisible: false,
      // 存储复选框id
      selectIds: []
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表信息
    async getRoleList() {
      const { data: res } = await this.$http.role.getRole(
        this.currentPage,
        this.pageSize,
        this.searchObj
      )
      const { items, total } = res.data
      if (res.code === 20000) {
        this.roleList = items
        this.roleList.forEach(item => {
          item.show = false
          item.originRoleName = item.roleName // 缓存角色名称, 用于取消
          return item
        })
        this.total = total
      }
    },
    // 切换页
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getRoleList()
    },
    // 切换当前数据展示数量
    handleSizeChange(newPage) {
      this.pageSize = newPage
      this.getRoleList()
    },

    // 展示添加窗口
    addRole() {
      this.addDialogVisible = true
    },
    // 关闭弹框
    closeAddDiolog() {
      this.addDialogVisible = false
      this.$refs.addRuleForm.resetFields()
    },
    // 确认添加角色
    confirmAddDiolog() {
      this.$refs.addRuleForm.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.role.addRole(this.addRuleForm)
          if (res.code === 20000) {
            this.$message.success('添加角色成功')
            this.getRoleList()
            this.$refs.addRuleForm.resetFields()
            this.addDialogVisible = false
          }
        } else {
          this.$message.error('添加用户失败')
        }
      })
      this.addDialogVisible = false
    },
    // 修改角色信息
    editRole(row) {
      row.show = true
      this.$nextTick(() => {
        this.$refs.editInpt.focus()
      }, 50)
    },
    // 确认修改
    async confirmEditRole(row) {
      this.addRuleForm.id = row.id
      this.addRuleForm.roleName = row.roleName
      const { data: res } = await this.$http.role.editRole(this.addRuleForm)
      if (res.code === 20000) {
        this.$message.success('修改角色信息成功')
        row.show = false
      } else {
        this.$message.error('修改角色信息失败')
      }
    },
    // 取消修改
    cancel(row) {
      row.show = false
    },
    // 删除角色
    removeRole(row) {
      this.$messageBox('是否要删除此角色信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.role.deleteRole(row.id)
          if (res.code === 20000) {
            this.getRoleList(
              this.addRuleForm.length === 1
                ? this.currentPage - 1
                : this.currentPage
            )
            this.$message.success('删除成功')
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
    // 复选框改变事件
    handleSelectionChange(value) {
      this.selectIds = value.map(item =>
        item.id
      )
    },
    // 批量删除角色数据
    removeAll() {
      this.$messageBox('是否要删除这些角色信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.role.deleteAllRole(this.selectIds)
          if (res.code === 20000) {
            this.getRoleList(
              this.addRuleForm.length === 1
                ? this.currentPage - 1
                : this.currentPage
            )
            this.$message.success('批量删除成功')
          } else {
            this.$message.error('批量删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 查询功能
    searchRole() {
      this.searchObj = { ...this.tempSearchObj }
      this.getRoleList()
    },
    // 重置表单
    resetSearch() {
      this.tempSearchObj = {
        roleName: ''
      }
      this.searchObj = {
        roleName: ''
      }
      this.getRoleList()
    },
    // 分配角色功能
    pickRole() {
      this.$message.info('此功能目前还在开发中')
    }
  }
}
</script>

<style></style>
