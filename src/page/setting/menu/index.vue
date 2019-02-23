<template>
    <div class="menu-manager">
      <kz-tree :data="tree" @node-click="hanldeNodeClick"/>
      <!--<menu-form class="menu-form" :content="content"/>-->
    </div>
</template>

<script>
  import MenuForm from './menu-form';

  export default {
    name: "index",
    components:{
      MenuForm,
      kzTree: require('./menu-tree')
    },
    data () {
      return {
        content: 'TreeManager',
        tree: {
          url: {
            C: '/api/tree/add',
            U: '/api/tree/update',
            R: '/api/tree/list',
            D: '/api/tree/delete'
          }
        }
      }
    },
    methods: {
      hanldeNodeClick (data) {
        this.content = data.name
      }
    }
  }
</script>
<style lang="less">
  .menu-manager{
    display: flex;
    flex-direction: row;
    .menu-tree{
      flex-basis: 250px;
      border: 1px solid #f8f8f8;
      padding: 20px;
    }

  }
</style>
