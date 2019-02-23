<template>
  <div class="menu-form-wrap">
    <menu-dialog
      :menuDialogVisible="menuDialogVisible"
      @closeDialog="closeDialog"
      @setMenuName="setMenuName"
    />
  </div>
</template>
<script>
  import {Form, FormItem, Button,Input,RadioGroup,Radio,CheckboxGroup,Checkbox,DatePicker} from 'element-ui';
  import MenuDialog from './menu-dialog'
  export default {
    components:{
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput:Input,
      ElRadioGroup:RadioGroup,
      ElRadio:Radio,
      ElDatePicker:DatePicker,
      MenuDialog
    },
    props:['content'],
    data() {
      return {
        menuName:'', // 菜单名称
        iconName:'', // 图标名称
        menuDialogVisible:false // 是否显示菜单弹框
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      closeDialog(){
        this.menuDialogVisible = false;
      },
      // 设置菜单名称
      setMenuName(_val){
        this.menuDialogVisible = false
        this.menuName = _val;
      }
    }
  }
</script>

<style lang="less" scoped>
.menu-form-wrap{
  display: flex;
  /*width: 200px;*/
}
</style>
