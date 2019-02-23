<template>
  <el-dialog
    :title="panelTitle"
    :visible.sync="centerDialogVisible"
    class="post-list__dialog"
    :show-close="false"
    :close-on-click-modal="false"
    center="true">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="公司名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off" placeholder="请输入公司名称"/>
      </el-form-item>
      <el-form-item label="公司简介" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="5" v-model="form.desc" auto-complete="off" placeholder="请输入公司简介"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('closeDialog')">取 消</el-button>
    <el-button type="primary" @click="$emit('onSubmit')">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {Form, FormItem, Button, Input, Dialog} from 'element-ui';
  export default {
    props:['centerDialogVisible','form','panelTitle'],
    components: {
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElDialog: Dialog,
    },
    data(){
      return{
        labelPosition: 'right',
        formLabelWidth: '70px'
      }
    }
  }
</script>

