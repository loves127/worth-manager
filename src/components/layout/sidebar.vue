<template>
  <div class="console-sidebar">
    <el-menu :unique-opened='true'
             text-color="yellow"
             mode="vertical"
             :router='true'
             theme="dark"
             :default-active="defaultActive"
             :collapse="isCollapse"
             :collapse-transition="true"
             class="sidebar-content">
      <el-menu-item index="/quick" class="logo-title" style="background-color: #000c17">
        <img class="icon-logo" :class="[isCollapse? 'shouqiIcon':'zhankaiIcon']" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=745315900,1003984187&fm=27&gp=0.jpg" alt="">
        <span style="font-size: 18px">未来社区后台管理</span>
      </el-menu-item>
      <el-submenu index="index">
        <template slot="title">
          <i class="iconfont icon-914caidan_mokuai"></i>
          <span slot="title">控制台</span>
        </template>
        <el-menu-item index="/analysis">
          <i class="iconfont icon-wenzhang"></i>
          <span slot="title">分析页</span>
        </el-menu-item>
        <el-menu-item index="/console">
          <i class="iconfont icon-wenzhang"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="money">
        <template slot="title">
          <i class="iconfont icon-914caidan_mokuai"></i>
          <span slot="title">收支管理</span>
        </template>
        <el-menu-item index="/receipts">
          <i class="iconfont icon-wenzhang"></i>
          <span slot="title">收入管理</span>
        </el-menu-item>
        <el-menu-item index="/expenses">
          <i class="iconfont icon-icon1"></i>
          <span slot="title">支出管理</span>
        </el-menu-item>
        <el-menu-item index="/transferRecord">
          <i class="iconfont icon-tuijian1"></i>
          <span slot="title">转账记录</span>
        </el-menu-item>
        <el-menu-item index="/budget">
          <i class="iconfont icon-tuijian1"></i>
          <span slot="title">预算方案</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="user">
        <template slot="title">
          <i class="iconfont icon-914caidan_mokuai"></i>
          <span slot="title">组织管理</span>
        </template>
        <el-menu-item index="/user">
          <i class="iconfont icon-yonghu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/company">
          <i class="iconfont icon-gongsimingcheng"></i>
          <span slot="title">公司管理</span>
        </el-menu-item>
        <el-menu-item index="/department">
          <i class="iconfont icon-icon"></i>
          <span slot="title">部门管理</span>
        </el-menu-item>
        <el-menu-item index="/post">
          <i class="iconfont icon-icon"></i>
          <span slot="title">岗位管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="base">
        <template slot="title">
          <i class="iconfont icon-shezhi1"></i>
          <span slot="title">信息设置</span>
        </template>
        <el-menu-item index="/baseSetting">
          <i class="iconfont icon-caidanpeizhi"></i>
          <span slot="title">基本设置</span>
        </el-menu-item>
        <el-menu-item index="/accountSetting">
          <i class="iconfont icon-caidanpeizhi"></i>
          <span slot="title">账户设置</span>
        </el-menu-item>
        <el-menu-item index="/">
          <i class="iconfont icon-caidanpeizhi"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="permission">
        <template slot="title">
          <i class="iconfont icon-shezhi1"></i>
          <span slot="title">权限设置</span>
        </template>
        <el-menu-item index="/menu">
          <i class="iconfont icon-caidanpeizhi"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/role">
          <i class="iconfont icon-caidanpeizhi"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/permission">
          <i class="iconfont icon-caidanpeizhi"></i>
          <span slot="title">权限管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="sys">
        <template slot="title">
          <i class="iconfont icon-shezhi1"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item index="/">
          <i class="iconfont icon-caidanpeizhi"></i>
          <span slot="title">密码修改</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import {Menu, Submenu, MenuItem, Icon} from 'element-ui';
  export default {
    props: ['isCollapse'],
    date() {
      return {
        isCollapse: false
      }
    },
    components: {
      ElMenu: Menu,
      ElSubmenu: Submenu,
      ElMenuItem: MenuItem,
      Icon: Icon
    },
    computed: {
      defaultActive: function () {
        const that = this;
        return that.$route.meta && that.$route.meta.activePath || this.$route.path;
      }
    }
  }
</script>
<style lang="less">
  .console-sidebar {
    -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
    .logo-title{
      font-size: 20px;
      background-color: #002140;
      font-weight: 600;
      height: 64px;
      line-height: 64px;
    }
    .el-submenu {
      background: #001529;
    }
    .el-menu-item {
      background-color: #000c17;
      &.is-active {
        color: #fff;
        background-color: #1890ff;
      }
    }
    .sidebar-content {
      .zhankaiIcon{
        width: 40px;
        height: 40px;
      }
      .shouqiIcon{
        width: 20px;
        height: 20px;
      }
      width: 256px;
      height: 100%;
      background: #001529;
    }
    .el-menu--collapse{
      width: 64px;
    }
  }
</style>
