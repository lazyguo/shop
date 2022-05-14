<template>
  <div class="home-main" style="height: 100%">
    <el-container style="height: 100%">
      <el-header>
        <h1></h1>
        <div>
          <el-dropdown  @command="logout">
            <span class="el-dropdown-link">
               <img src="../../assets/img/logout.jpg" alt="" style="width:50px;height:50px;border-radius:50%">
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:-5px">
              <el-dropdown-item >退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <Aside></Aside>
        <el-main style="background:#f6f9fe">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './Components/Aside'
export default {
  name: 'home',
  components: {
    Aside
  },
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
  position: relative;
  background-color: #9ba4c1;
  line-height: 20px;
  h1 {
    position: absolute;
    left: 10px;
    height: 15px;
    color: #fff;
  }
 .el-dropdown {
    position: absolute;
    right: -70px;
    top: 5px;
    width: 150px;
    height: 100%;
  }
}
</style>
