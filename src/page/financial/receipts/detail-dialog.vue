<template>
  <el-dialog
    title="详情"
    :visible.sync="dialogVisible"
    width="200px"
    center>
    <el-form  :form="detail" :label-position="labelPosition">
      <el-form-item label="进账项目" :label-width="formLabelWidth">
        <span>{{detail.incomeType}}</span>
      </el-form-item>
      <el-form-item label="账户名称" :label-width="formLabelWidth">
        <span>{{detail.accountName}}</span>
      </el-form-item>
      <el-form-item label="收入账号" :label-width="formLabelWidth">
        <span>{{detail.accountNo}}</span>
      </el-form-item>
      <el-form-item label="进账日期" :label-width="formLabelWidth">
        <span>{{detail.recordDate}}</span>
      </el-form-item>
      <el-form-item label="收入金额" :label-width="formLabelWidth">
        <span>{{money}}</span>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="detail.remark" :disabled="true"/>
      </el-form-item>
    </el-form>
    <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="$emit('closeDialog')">关闭</el-button>-->
    <!--</span>-->
  </el-dialog>
</template>

<script>

  import {Dialog,Button,Form,FormItem,Input} from 'element-ui';
  export default {
    props:['centerDialogVisible','detail'],
    components: {
      ElDialog: Dialog,
      ElButton: Button,
      ElForm: Form,
      ElInput: Input,
      ElFormItem: FormItem
    },
    data(){
      return{
        labelPosition: 'right',
        formLabelWidth: '70px',
        selectIcon:'',
        dialogVisible:false
      }
    },
    created(){
//      console.log(this.detail)
    },
    computed:{
      money:function () {
        return '¥'+this.detail.money+'.00'
      }
    },
    methods:{
      openDialog(){
         this.dialogVisible = true
      }
    }
  }
</script>

<style>

</style>
