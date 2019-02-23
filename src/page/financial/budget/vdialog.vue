<template>
  <el-dialog
    :title="panelTitle"
    :visible.sync="centerDialogVisible"
    class="post-list__dialog"
    :show-close="false"
    :close-on-click-modal="false"
    center="true">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="类别" :label-width="formLabelWidth">
        <el-select v-model="form.classfy" placeholder="请选择支出类别">
          <el-option :label="e.expenditureType" v-model="e.expenditureType" v-for="(e,index) in exType" :key="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="设置金额" :label-width="formLabelWidth">
        <el-input v-model="form.amount" auto-complete="off" placeholder="请输入金额"/>
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
    props:['centerDialogVisible','form','panelTitle','exType'],
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
        formLabelWidth: '70px'
      }
    }
  }
</script>
