<template>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="岗位">
      <el-autocomplete
        class="inline-input"
        v-model="search.name"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        placeholder="请输入岗位名称"
        @select="handleSelect"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onSearch',search)">查询</el-button>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="$emit('openDialog','新增岗位','')">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {Form, FormItem, Button, Autocomplete,} from 'element-ui';
  import PostApi from '@/api/post';
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
        companyNames: [],
      }
    },
    methods:{
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      querySearch(queryString, cb) {
        let companyNames = this.companyNames;
        let results = queryString ? companyNames.filter(this.createFilter(queryString)) : companyNames;
        cb(results);
      },
      // 获取查询参数
      getSearchParams(){
        return this.search;
      },
      handleSelect(){},
    },
    mounted() {
      const res = PostApi.findAllPname();
      res.then(rs=>{
        this.companyNames = rs.data
      })
    }
  }
</script>
