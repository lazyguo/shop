<template>
  <div class="login-main">
    <!-- 背景图 -->
    <div class="bgc"></div>
    <!-- 登陆表单 -->
    <!-- 大盒子 -->
    <Transition>
      <div class="box" v-show="isShow">
        <h3>欢迎登陆</h3>
        <!-- 登陆表单 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRule"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 登陆按钮 -->
        <el-button type="primary" round class="btn" @click="loginUser"
          >登陆</el-button
        ><el-button type="primary" round class="btn" @click="clearAll"
          >重置</el-button
        >
        <!-- <div class="forget"><span>忘记密码</span></div> -->
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      isShow: false,
      // 登陆表单数据
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      // 登陆表单规则
      loginFormRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登陆功能
    loginUser() {
      this.$refs.loginFormRef.validate((valid) => {
        // 登陆功能
        if (valid) {
          this.$store
            .dispatch('login', this.loginForm)
            .then(() => {
              this.$router.push('/home')
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
            })
            .catch(() => {
              return Promise.reject(new Error('error'))
            })
        } else {
          this.$message.error('登陆失败')
          return false
        }
      })
    },
    // 重置
    clearAll() {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  },
  mounted() {
    // 显示过渡效果
    this.isShow = true
  }
}
</script>

<style scoped lang="less">
.login-main {
  height: 100%;
}
.bgc {
  height: 100%;
  background: url(../../assets/img/demo.jpg) no-repeat;
  background-size: cover;
}
.box {
  position: absolute;
  top: 260px;
  left: 635px;
  width: 400px;
  height: 280px;
  background-color: rgba(179, 207, 240, 0.3);
  border-radius: 20px;
  text-align: center;
  padding: 0 50px;
  h3 {
    font-size: 26px;
    margin-top: 20px;
  }
  .login-form {
    margin-top: 15px;
  }
  .btn {
    width: 150px;
    background-color: #799cc2;
  }
  .forget {
    margin-top: 3px;
    color: #d39585;
    span {
      margin-left: 10px;
    }
  }
}

.v-enter,
.v-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 1s linear;
}
</style>
