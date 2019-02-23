<template>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="类型">
      <el-autocomplete style="width: 150px"
        class="inline-input"
        v-model="search.expenditureType"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        placeholder="类别"
        @select="handleSelect"/>
    </el-form-item>
    <el-form-item label="账户">
      <el-select v-model="search.accountName" placeholder="账户" style="width: 130px" @change="$emit('changeAccount',search.accountName)">
        <el-option label="全部" value=""/>
        <el-option :label="a.accountName" v-model="a.accountName" v-for="(a,index) in accountNameList" :key="index"/>
      </el-select>
    </el-form-item>
    <el-form-item label="账号">
      <el-select v-model="search.accountNo" placeholder="账号" style="width: 150px">
        <el-option label="全部" value=""/>
        <el-option :label="a.accountNo" v-model="a.accountNo" v-for="(a,index) in accountNoList" :key="index"/>
      </el-select>
    </el-form-item>
    <el-form-item label="标签">
      <el-select v-model="search.tag" placeholder="账号" style="width: 150px">
        <el-option label="全部" value=""/>
        <el-option label="父母" value="父母"/>
        <el-option label="家" value="家"/>
        <el-option label="哥" value="哥"/>
      </el-select>
    </el-form-item>
    <el-form-item label="消费级别">
      <el-select v-model="search.accountNo" placeholder="账号" style="width: 150px">
        <el-option label="全部" value=""/>
        <el-option :label="a.accountNo" v-model="a.accountNo" v-for="(a,index) in accountNoList" :key="index"/>
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker
        v-model="search.rangeDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onSearch',search)">查询</el-button>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="$emit('openDialog','新增支出')">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {Form, FormItem, Button, Autocomplete,DatePicker, Select, Option} from 'element-ui';
  export default {
    name: "vsearch",
    components: {
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElAutocomplete: Autocomplete,
      ElDatePicker:DatePicker,
      ElSelect:Select,
      ElOption: Option
    },
    props:['accountNameList','accountNoList'],
    data(){
      return{
        search: {
          incomeType: '',
          rangeDate:'',
          tag:''
        },
        departmentNames: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods:{
      // 获取查询参数
      getSearchParams(){
        return this.search;
      },
      handleSelect(){},
      querySearch(){}
    }

  }
</script>
