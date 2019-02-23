<template>
  <el-dialog
    title="图标"
    :visible.sync="iconDialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    center="true">
     <div class="icon-list">
        <div class="icon-item" v-for="icon in iconList"  :class="{active:defaultId === icon.id}" @click="changeIcon(icon.id,icon._class)">
            <i class="iconfont" :class="icon._class"></i>
        </div>
     </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('closeDialog')">取 消</el-button>
    <el-button type="primary" @click="$emit('onSubmitToSelect')">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {Dialog,Button} from 'element-ui'
  import iconList from './iconList'
  export default {
    props: ['iconDialogVisible'],
    data(){
      return {
        defaultId:1,
        selectIcon:'',
        active:'active',
        iconList:iconList
      }
    },
    components: {
      ElDialog: Dialog,
      ElButton:Button
    },
    methods:{
      changeIcon(_id,_class){
        this.defaultId = _id
        this.selectIcon = _class
      },
      getIncon(){
        return this.selectIcon;
      }
    }
  }
</script>

<style scoped lang="less">
.icon-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .icon-item{
    display: flex;
    flex-direction: column;
    width: 50px;
    height: 50px;
    line-height: 50px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    &.active{
      color: #fff;
      background-color: darkmagenta;
    }
  }
  .icon-desc{
    font-size: 12px;
  }
  .iconfont{
    font-size: 30px;
  }
  .el-dialog__body{
    padding: 10px !important;
  }
  .el-dialog--small{
    width: 50% !important;
  }
}
</style>
