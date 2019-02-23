<template>
  <el-row class="console-topbar" type="flex">
    <el-col :xs="12" :sm="12" :md="12" :lg="12">
      <div class="topbar-home"  @click="$emit('trigger')">
        <i class="iconfont" :class="[isCollapse?'icon-caozuo-zhankai':'icon-caozuo-shouqi']" style="font-size: 24px"></i>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12">
      <el-dropdown trigger="click" class="topbar-info" @command="handleCommand">
        <a href="javascript:void(0)" class="user-name">
          zzw2018<i class="el-icon-caret-bottom el-icon--right"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>重置密码</el-dropdown-item>
          <el-dropdown-item command="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
  import { Row, Col, Dropdown, Icon, DropdownMenu, DropdownItem } from 'element-ui';
  export default {
    components: {
      ElRow: Row,
      ElCol: Col,
      ElDropdown: Dropdown,
      ElDropdownMenu: DropdownMenu,
      ElDropdownItem: DropdownItem,
      Icon: Icon
    },
    props:['isCollapse'],
    data () {
      return {
        // shouqi: 'icon-caozuo-shouqi',
        // zhankai:'icon-caozuo-zhankai'
      }
    },
    methods: {
      handleCommand(command) { // 点击菜单项触发的事件回调
        const that = this;
        if(command == 'signOut') { // 模拟退出登录
          let $sto = that.$sto;
          let $conf = that.$conf;
          let cookies = $sto.get($conf.constant.cookie);
          if(cookies && cookies.token) {
            delete cookies.token;
          }
          $sto.set($conf.constant.cookie, cookies);
          that.$router.push({path: $conf.route.login});
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .console-topbar {
    z-index: 101;
    clear: both;
    height: 50px;
    font-size: 12px;
    width: 100%;
    webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

    .el-col {
      background: #09C;
      height: 50px;
      color: #fff;
      font-size: 14px;
      line-height: 50px;
      .topbar-home {
        display: block;
        width: 50px;
        /*background: #0087b4;*/
        color: #FFF;
        text-align: center;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
      }
      .topbar-info {
        float: right;
        padding: 0 10px;
        width: 100px;
        height: 50px;
        line-height: 50px;
        display: block;
        z-index: 2;
        background: #09c;
        color: #fff;
        font-size: 14px;
        border-left: 1px solid #008fbf;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .user-name {
          display: block;
          width: 100%;
          color: #fff;
          font-size: 14px;
        }
        .el-dropdown-menu {
          padding: 0 !important;
          .el-dropdown-menu__item {
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>
