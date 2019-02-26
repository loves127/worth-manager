<template>
  <div class="console-body">
    <sidebar class="sidebar" :isCollapse="isCollapse"/>
    <div class="console-main">
      <topbar :isCollapse="isCollapse" @trigger="trigger"/>
      <navbar v-show="hasNavbar"/>
      <div :class="{'console-main-full': hasNavbar}">
        <bcrumd class="console-bcrumd"/>
        <router-view class="contaniner" />
      </div>
    </div>
  </div>
</template>
<script>
  import Topbar from '../components/layout/topbar';
  import Sidebar from '../components/layout/sidebar';
  import Bcrumd from '../components/layout/bcrumd';
  import Navbar from '../components/layout/navbar';
  export default {
    components: {
      Topbar,
      Sidebar,
      Bcrumd,
      Navbar
    },
    data () {
      return {
        isCollapse: false
      }
    },
    computed: {
      hasNavbar () {
        const $route = this.$route;
        return $route.meta && $route.meta.navbar && $route.meta.navbar.length > 0;
      }
    },
    methods: {
      trigger(){
        this.isCollapse = !this.isCollapse
      },
    }
  }
</script>
<style lang="less" scoped>
  .console-body {
    display: flex;
    flex-direction: row;
    height: 100vh;
    .console-main {
      width: 100%;
      overflow-y: scroll;
      &.console-main-full {
        margin-left: 130px;
      }
      .console-bcrumd {
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
      }
      .contaniner{
        overflow-x: hidden;
        /*margin: 5px 0;*/
        padding: 0 5px;
        /*background-color: #f3f3f3;*/
      }
    }
  }
</style>
