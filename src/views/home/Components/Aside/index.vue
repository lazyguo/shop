<template>
  <el-aside width="200px" >
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#cfd3e9"
      text-color="#9aa3c0"
      active-text-color="#fff"
      style="height: 100%"
      unique-opened
      router
    >
     <el-menu-item index="dashBord">
        <i class="el-icon-s-home" style="color:#9099b8"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid" style="color:#9099b8"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="user">用户管理</el-menu-item>
          <el-menu-item index="role">权限管理</el-menu-item>
          <el-menu-item index="menu">菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-goods" style="color:#9099b8"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="tradeMark">品牌管理</el-menu-item>
          <el-menu-item index="attr">商品属性管理</el-menu-item>
          <el-menu-item index="spu">SPU</el-menu-item>
          <el-menu-item index="sku">SKU</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    open() {
      this.isCollapse = !this.isCollapse
      console.log(this.isCollapse)
    }
  }
}
</script>

<style lang="less" scoped>
.open {
  text-align: center;
  line-height: 30px;
  height: 30px;
  background: rgb(100, 128, 255);
  strong {
    cursor: pointer;
  }
}
.el-aside {
  overflow:none
}
</style>
