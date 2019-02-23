<template>
  <el-dialog
    :title="panelTitle"
    :visible.sync="centerDialogVisible"
    class="post-list__dialog"
    :show-close="false"
    :close-on-click-modal="false"
    center="true">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="岗位名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off" placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="更新日期" :label-width="formLabelWidth">
        <el-date-picker v-model="form.updateTime"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.state" placeholder="请选择状态">
          <el-option label="停用" value="停用"/>
          <el-option label="启用" value="启用"/>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.remark" auto-complete="off" placeholder="请输入工作"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('closeDialog')">取 消</el-button>
    <el-button type="primary" @click="$emit('onSubmit')">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  import {Form, FormItem, Button, Input, Dialog,DatePicker,Select, Option} from 'element-ui';
  export default {
    props:['centerDialogVisible','form','panelTitle'],
    components: {
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElDialog: Dialog,
      ElDatePicker: DatePicker,
      ElSelect: Select,
      ElOption: Option,
    },
    data(){
      return{
        labelPosition: 'right',
        formLabelWidth: '70px'
      }
    }
  }
</script>
