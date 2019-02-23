<template>
  <el-dialog
    title="请选择父菜单"
    :visible.sync="centerDialogVisible"
    :showClose="false"
    width="30%"
    :center="true">
    <el-tree
      :data="data"
      ref="tree"
      :props="defaultProps"
      @node-click="handleNodeClick">
    </el-tree>
  </el-dialog>
</template>

<script>
  import {Dialog,Button,Tree} from 'element-ui'
  export default {
    name: "menu-dialog",
    props: ['centerDialogVisible'],
    components:{
      ElDialog: Dialog,
      ElButton:Button,
      ElTree: Tree
    },
    data(){
      return{
        data: [{
          label: '内容管理'
        }, {
          label: '收支管理'
        }, {
          label: '组织管理',
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
      handleNodeClick(data){
        this.$emit('setMenuName',data.label);
      }
    }
  }
</script>

<style scoped>

</style>
