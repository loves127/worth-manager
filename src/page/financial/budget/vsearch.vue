<template>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="类型">
      <el-autocomplete
        class="inline-input"
        v-model="search.classfy"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        placeholder="请输入预算方案类型"
        @select="handleSelect"/>
    </el-form-item>
    <el-form-item label="录入日期">
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
      <el-button type="primary" @click="$emit('openDialog','新增预算方案')">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {Form, FormItem, Button, Autocomplete,DatePicker} from 'element-ui';
  export default {
    name: "vsearch",
    components: {
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElAutocomplete: Autocomplete,
      ElDatePicker:DatePicker
    },
    data(){
      return{
        search: {
          rangeDate:'',
          incomeType: ''
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
        value7: ''
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
