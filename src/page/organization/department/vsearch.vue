<template>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="部门">
      <el-autocomplete
        class="inline-input"
        v-model="search.name"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        placeholder="请输入部门名称"
        @select="handleSelect"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onSearch',search)">查询</el-button>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="$emit('openDialog','新增部门')">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {Form, FormItem, Button, Autocomplete,} from 'element-ui';
  import DepartmentApi from '@/api/department';
  export default {
    name: "vsearch",
    components: {
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElAutocomplete: Autocomplete
    },
    data(){
      return{
        search: {
          name: ''
        },
        departmentNames: [],
      }
    },
    methods:{
      createFilter(queryString) {
        return (departmentNames) => {
          return (departmentNames.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      querySearch(queryString, cb) {
        let departmentNames = this.departmentNames;
        let results = queryString ? departmentNames.filter(this.createFilter(queryString)) : departmentNames;
        cb(results);
      },
      // 获取查询参数
      getSearchParams(){
        return this.search;
      },
      handleSelect(){},
    },
    mounted() {
      const res = DepartmentApi.findAllDname();
      res.then(rs=>{
        this.departmentNames = rs.data
      })
    }
  }
</script>
