<template>
  <div class="user-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/dashBord' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-form inline>
        <el-form-item>
          <el-input
            placeholder="请输入用户名"
            style="width: 300px"
            v-model="tempSearchObj.username"
          ></el-input>
        </el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          style="margin: 0 10px"
          @click="searchUser"
          >查询</el-button
        >
        <el-button @click="resetSearch">清空</el-button>
      </el-form>

      <!-- 添加商品 -->
      <div style="margin-bottom: 15px">
        <el-button type="primary" icon="el-icon-plus" @click="addUser"
          >添加</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteAll"
          :disabled="selectedIds.length === 0"
          >批量删除</el-button
        >
      </div>

      <!-- 表格区域 -->
      <el-table
        stripe
        style="width: 100%"
        border
        :data="userList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="70px" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="nickName" label="用户昵称" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="权限列表" align="center">
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="gmtModified" label="更新时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <el-button
              type="info"
              title="分配角色"
              icon="el-icon-user-solid"
              size="mini"
              @click="showRole(row)"
            ></el-button>
            <el-button
              type="primary"
              title="修改用户"
              icon="el-icon-edit"
              size="mini"
              @click="editUser(row)"
            ></el-button>
            <el-button
              type="danger"
              title="删除用户"
              icon="el-icon-delete"
              size="mini"
              @click="removeUser(row)"
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
        style="text-align: center; margin-top: 8px"
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addRuleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="addRuleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addRuleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDiolog">取 消</el-button>
        <el-button type="primary" @click="confirmAddDiolog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改功能 -->
    <el-dialog
      title=" 修改用户"
      :visible.sync="editDialogVisible"
      width="40%"
      :before-close="closeEditDiolog"
    >
      <el-form
        :model="addRuleForm"
        :rules="addUserRules"
        ref="editRuleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addRuleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="addRuleForm.nickName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditDiolog">取 消</el-button>
        <el-button type="primary" @click="confirmEditDiolog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog
      title="设置x`角色"
      :visible.sync="dialogRoleVisible"
      :before-close="closeRoleDiolog"
    >
      <el-form label-width="80px" ref="roleForm">
        <el-form-item label="用户名">
          <el-input disabled :value="addRuleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="角色列表">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group v-model="assignRoles" @change="handleCheckChange">
            <el-checkbox
              v-for="role in allRoleList"
              :label="role.id"
              :key="role.id"
              >{{ role.roleName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="closeRoleDiolog">保存</el-button>
        <el-button @click="dialogRoleVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
export default {
  name: 'user',
  data() {
    return {
      // 当前页
      currentPage: 1,
      // 每页展示多少数据
      pageSize: 3,
      // 总数据
      total: 0,
      // 存储表格数据
      userList: [],
      // 搜索框的双向绑定
      admin: '',
      // 弹框的显隐
      addDialogVisible: false,
      editDialogVisible: false,
      dialogRoleVisible: false,
      // 添加用户弹框
      addRuleForm: {
        username: '',
        nickName: '',
        password: ''
      },
      // 表单验证规则
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 复选框是否可以全选
      isIndeterminate: true,
      // 角色权限列表
      allRoleList: [],
      // 权限id数据
      assignRoles: [],
      checkAll: false,
      // 表格复选框id
      selectedIds: [],
      searchObj: { // 包含请求搜索条件数据的对象
        username: ''
      },
      tempSearchObj: { // 收集搜索条件输入的对象
        username: ''
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表信息
    async getUserList() {
      const { data: res } = await this.$http.user.getUser(
        this.currentPage,
        this.pageSize,
        this.searchObj
      )
      if (res.code === 20000) {
        this.total = res.data.total
        this.userList = res.data.items
        this.userList = res.data.items.filter(item => item.username !== 'admin')
        this.selectedIds = []
      } else {
        this.$message.error('获取用户信息失败')
      }
    },
    // 查询功能实现
    searchUser() {
      this.searchObj = { ...this.tempSearchObj }
      this.getUserList()
    },
    // 重置输入后搜索
    resetSearch () {
      this.searchObj = {
        username: ''
      }
      this.tempSearchObj = {
        username: ''
      }
      this.getUserList()
    },
    // 每页展示多少数据
    handleSizeChange(newPage) {
      this.pageSize = newPage
      this.getUserList()
    },
    // 切换页
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getUserList()
    },
    // 添加用户
    addUser() {
      this.addDialogVisible = true
    },
    // 取消关闭弹窗
    closeAddDiolog() {
      this.addDialogVisible = false
      this.$refs.addRuleForm.resetFields()
    },
    closeEditDiolog() {
      this.editDialogVisible = false
      this.$refs.editRuleForm.resetFields()
    },
    // 添加用户确定按钮
    confirmAddDiolog() {
      this.$refs.addRuleForm.validate((valid) => {
        if (valid) {
          this.$http.user.addUser(this.addRuleForm).then((result) => {
            this.$message.success('添加用户成功')
            this.getUserList()
            this.addDialogVisible = false
          })
        } else {
          this.$message.error('添加用户失败')
        }
      })
    },
    // 修改用户信息
    editUser(row) {
      this.addRuleForm.id = row.id
      this.addRuleForm.username = row.username
      this.addRuleForm.nickName = row.nickName
      this.editDialogVisible = true
    },
    // 修改用户确认按钮
    confirmEditDiolog() {
      this.$refs.editRuleForm.validate((valid) => {
        if (valid) {
          this.$http.user.editUser(this.addRuleForm).then((result) => {
            this.$message.success('修改用户成功')
            this.getUserList()
            this.editDialogVisible = false
          })
        } else {
          this.$message.error('修改用户失败')
        }
      })
    },
    // 删除用户
    async removeUser(row) {
      this.$messageBox('是否要删除此用户信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.user.deleteUser(row.id).then((result) => {
            this.getUserList(
              this.addRuleForm.length === 1
                ? this.currentPage - 1
                : this.currentPage
            )
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取角色数据
    async getRoles() {
      const { data: res } = await this.$http.user.getRole(this.addRuleForm.id)
      const { allRolesList, assignRoles } = res.data
      this.allRoleList = allRolesList
      this.assignRoles = assignRoles.map((item) => item.id)

      this.checkAll = allRolesList.length === assignRoles.length
      this.isIndeterminate =
        assignRoles.length > 0 && assignRoles.length < allRolesList.length
    },

    // 分配角色弹框展示
    async showRole(row) {
      this.addRuleForm = row
      this.dialogRoleVisible = true
      this.getRoles()
    },
    // 关闭分配角色弹窗
    closeRoleDiolog() {
      this.dialogRoleVisible = false
      this.$refs.roleForm.resetFields()
    },
    // 全选
    handleCheckAllChange(value) {
      // value 当前勾选状态true/false
      // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
      this.assignRoles = value ? this.allRoleList.map((item) => item.id) : []
      // 如果当前不是全选也不全不选时, 指定为false
      this.isIndeterminate = false
    },
    // 单选
    handleCheckChange() {
      const { assignRoles, allRoleList } = this
      this.checkAll =
        assignRoles.length === allRoleList.length && allRoleList.length > 0
      this.isIndeterminate =
        assignRoles.length > 0 && assignRoles.length < allRoleList.length
    },
    // 批量删除功能
    deleteAll() {
      this.$messageBox('是否要删除此用户信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { data: res } = await this.$http.user.removeAll(this.selectedIds)
          if (res.code === 20000) {
            this.$message.success('删除成功')
            this.getUserList()
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
    // 选择框改变事件
    handleSelectionChange(value) {
      this.selectedIds = value.map(item => item.id)
    }
  }
}
</script>

<style></style>
