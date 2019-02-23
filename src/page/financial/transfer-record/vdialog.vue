<template>
  <el-dialog
    :title="panelTitle"
    :visible.sync="centerDialogVisible"
    class="post-list__dialog"
    :show-close="false"
    :close-on-click-modal="false"
    center="true">
    <el-form :model="form" :label-position="labelPosition">

      <el-form-item label="转出账户" :label-width="formLabelWidth">
        <el-select v-model="form.outAccount" placeholder="请选择转出账户">
          <el-option :label="e.accountNo" v-model="e.accountNo" v-for="(e,index) in accountNoList" :key="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="转入账户" :label-width="formLabelWidth">
        <el-select v-model="form.inAccount" placeholder="请选择转入账户">
          <el-option :label="e.accountNo" v-model="e.accountNo" v-for="(e,index) in accountNoList" :key="index"/>
        </el-select>
      </el-form-item>

      <!--<el-form-item label="转账日期" :label-width="formLabelWidth">-->
        <!--<el-input v-model="form.transferDate" auto-complete="off" placeholder="请输入转账日期"/>-->
      <!--</el-form-item>-->
      <el-form-item label="转账金额" :label-width="formLabelWidth">
        <el-input v-model="form.transferAmount" auto-complete="off" placeholder="请输入转账金额"/>
      </el-form-item>
      <!--<el-form-item label="转账余额" :label-width="formLabelWidth">-->
      <!--<el-input v-model="form.accountBalance" auto-complete="off" placeholder="请输入转账余额"/>-->
    <!--</el-form-item>-->

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
    props:['centerDialogVisible','form','panelTitle','accountNoList'],
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
