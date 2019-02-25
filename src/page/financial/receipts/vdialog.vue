<template>
  <el-dialog
    :title="panelTitle"
    :visible.sync="centerDialogVisible"
    class="post-list__dialog"
    :show-close="false"
    :close-on-click-modal="false"
    center="true">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="收入类目" :label-width="formLabelWidth">
        <el-select v-model="form.incomeType" placeholder="请选择支出类别" @change="setIcon(form.incomeType)">
          <el-option :label="i.incomeType" v-model="i.incomeType" v-for="(i,index) in incomeTypeList" :key="index"/>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="类型图标" :label-width="formLabelWidth">-->
          <!--<i ref="iconRef" :data-icon="i.icon" class="iconfont icon-show" :class="i.icon" v-for="(i,index) in incomeTypeList" v-if="form.incomeType===i.incomeType" :key="index"></i>-->
      <!--</el-form-item>-->
      <el-form-item label="账户类型" :label-width="formLabelWidth">
        <el-select v-model="form.accountName" placeholder="请选择支出账户">
          <el-option :label="e.accountName" v-model="e.accountName" v-for="(e,index) in accountNameList" :key="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" :label-width="formLabelWidth">
        <el-select v-model="form.accountNo" placeholder="请选择支出账户" >
          <el-option :label="a.accountNo" v-model="a.accountNo" v-for="(a,index) in accountList" :key="index" v-if="form.accountName === a.accountName"/>
        </el-select>
      </el-form-item>
      <el-form-item label="金额" :label-width="formLabelWidth">
        <el-input v-model="form.money" auto-complete="off" placeholder="请输入金额"/>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="5" v-model="form.remark" auto-complete="off" placeholder="请输入备注"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('closeDialog')">取 消</el-button>
    <el-button type="primary" @click="$emit('onSubmit')">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {Form, FormItem, Button, Input, Dialog, Select, Option} from 'element-ui';
  export default {
    props:['centerDialogVisible','form','panelTitle','incomeTypeList','accountList','accountNameList'],
    components: {
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElDialog: Dialog,
      ElSelect:Select,
      ElOption: Option
    },
    data(){
      return{
        labelPosition: 'right',
        formLabelWidth: '70px',
        selectIcon:''
      }
    },
   methods:{
     setIcon(_icon){
       this.selectIcon = this.incomeTypeList.filter(item=>{
         return item.incomeType === _icon
       });
     },
     getIcon(){
       return this.selectIcon;
     }
   }
  }
</script>
