<template>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="账户名称">
      <el-input class="inline-input" v-model="search.accountName" placeholder="请输入账户名称"/>
    </el-form-item>
    <el-form-item label="账号">
      <el-select v-model="search.accountNo" placeholder="请选择账号">
        <el-option label="全部" value=""/>
        <el-option :label="a.accountNo" v-model="a.accountNo" v-for="(a,index) in accountNoList" :key="index"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onSearch',search)">查询</el-button>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="$emit('openDialog','新增账户','')">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {Form, FormItem, Button, Input, Select, Option} from 'element-ui';
  export default {
    name: "vsearch",
    components: {
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElSelect:Select,
      ElOption: Option
    },
    props:['accountNoList'],
    data(){
      return{
        search: {
          accountName: ''
        }
      }
    },
    methods:{
      // 获取查询参数
      getSearchParams(){
        return this.search;
      },
      handleSelect(){},
    }
  }
</script>
