<template>
  <el-dialog
    :title="panelTitle"
    :visible.sync="centerDialogVisible"
    class="post-list__dialog"
    :show-close="false"
    :close-on-click-modal="false"
    center="true">
    <el-form :model="form" :label-position="labelPosition">
      <!--<el-form-item label="账户名称" :label-width="formLabelWidth">-->
        <!--<el-input v-model="form.accountName" auto-complete="off" placeholder="请输入账户"/>-->
      <!--</el-form-item>-->

      <el-form-item label="账户名称" :label-width="formLabelWidth">
        <el-select v-model="form.accountName" placeholder="请输入账户">
          <el-option :label="e.name" v-model="e.name" v-for="(e,index) in accountTypeList" :key="index"/>
        </el-select>
      </el-form-item>

      <!--<el-form-item label="开户银行" :label-width="formLabelWidth" v-show="form.accountName === '银联账户'">-->
        <!--<el-input v-model="form.bankName" auto-complete="off" placeholder="请输入开户银行"/>-->
      <!--</el-form-item>-->

      <el-form-item label="账号" :label-width="formLabelWidth">
        <el-input v-model="form.accountNo" auto-complete="off" placeholder="请输入账号"/>
      </el-form-item>
      <el-form-item label="初始金额" :label-width="formLabelWidth" v-show="panelTitle == '新增账户'">
        <el-input v-model="form.initMoney" auto-complete="off" placeholder="请输入初始金额"/>
      </el-form-item>
      <!--<el-form-item label="余额" :label-width="formLabelWidth">-->
        <!--<el-input v-model="form.balance" auto-complete="off" placeholder="请输入余额"/>-->
      <!--</el-form-item>-->
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.remark" auto-complete="off" placeholder="请输入备注"/>
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
    props:['centerDialogVisible','form','panelTitle'],
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
        accountTypeList:[{
          _v:1,
          name:'微信'
        },{
          _v:2,
          name:'支付宝'
        },{
          _v:3,
          name:'余额宝'
        }]
      }
    }
  }
</script>
