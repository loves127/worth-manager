<template>
  <el-dialog
    :title="panelTitle"
    :visible.sync="centerDialogVisible"
    class="user-list__dialog"
    :show-close="false"
    :close-on-click-modal="false"
    center="true">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off" placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期" :label-width="formLabelWidth">
        <el-date-picker v-model="form.startDate"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth">
        <el-input :maxlength="11" v-model="form.tellphone" auto-complete="off" placeholder="请输入联系方式"/>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.eMail" auto-complete="off" placeholder="请输入邮箱"/>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" auto-complete="off" placeholder="请输入地址"/>
      </el-form-item>
      <el-form-item label="公司" :label-width="formLabelWidth">
        <el-select v-model="form.company" placeholder="请选择公司">
          <el-option :label="c.name" v-model="c.name" v-for="(c,index) in companyNames" :key="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" :label-width="formLabelWidth">
        <el-select v-model="form.department" placeholder="请选择部门">
          <el-option :label="d.name" v-model="d.name" v-for="(d,index) in departmentNames" :key="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位" :label-width="formLabelWidth">
        <el-select v-model="form.post" placeholder="请选择岗位">
          <el-option v-if="p.state !== '停用'" :label="p.name" v-model="p.name" v-for="(p,index) in postNames"
                     :key="index"/>
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
  import {Form, FormItem, Button, Select, Option, Input, Autocomplete, Dialog, DatePicker} from 'element-ui';
  export default {
    components: {
      ElButton: Button,
      ElSelect: Select,
      ElOption: Option,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElAutocomplete: Autocomplete,
      ElDialog: Dialog,
      ElDatePicker: DatePicker
    },
    props: ['companyNames', 'postNames', 'departmentNames', 'centerDialogVisible', 'panelTitle', 'form'],
    data() {
      return {
        labelPosition: 'right',
        formLabelWidth: '70px'
      }
    },
    created() {
    },
    methods: {}
  }
</script>
