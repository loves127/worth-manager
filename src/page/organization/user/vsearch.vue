<template>
  <el-form :inline="true" :model="search" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="search.name" placeholder="请输入姓名" style="width: 130px"/>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="search.sex" placeholder="请输入性别" style="width: 80px">
        <el-option label="全部" value=""/>
        <el-option label="男" value="男"/>
        <el-option label="女" value="女"/>
      </el-select>
    </el-form-item>
    <el-form-item label="公司">
      <el-autocomplete
        class="inline-input"
        v-model="search.company"
        :fetch-suggestions="querySearch"
        placeholder="请输入公司名称"
        @select="$emit('handleSelect')"/>
    </el-form-item>
    <el-form-item label="部门">
      <el-select v-model="search.department" placeholder="请输入岗位" style="width: 130px">
        <el-option label="全部" value=""/>
        <el-option :label="d.name" v-model="d.name" v-for="(d, j) in departmentNames" :key="j"/>
      </el-select>
    </el-form-item>
    <el-form-item label="岗位">
      <el-select v-model="search.post" placeholder="请输入岗位" style="width: 130px">
        <el-option label="全部" value=""/>
        <el-option v-if="p.state !== '停用'" :label="p.name" v-model="p.name" v-for="(p,k) in postNames" :key="k"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onSearch',search)">查询</el-button>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="$emit('openDialog','新增用户','')">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {Form, FormItem, Button, Select, Option, Input, Autocomplete,} from 'element-ui';
  import UserApi from '@/api/user';
  export default {
    props: ['departmentNames', 'postNames'],
    components: {
      ElButton: Button,
      ElSelect: Select,
      ElForm: Form,
      ElFormItem: FormItem,
      ElOption: Option,
      ElInput: Input,
      ElAutocomplete: Autocomplete
    },
    data() {
      return {
        search: {
          name: '',
          sex: '',
          post: '',
          department: '',
          company: ''
        }
      }
    },
    methods: {
      createFilter(queryString) {
        return (companyNames) => {
          return (companyNames.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      // 获取查询参数
      getSearchParams(){
        return this.search;
      },
      // 按公司名称搜索
      querySearch(queryString, cb) {
        let companyNames = this.companyNames;
        let results = queryString ? companyNames.filter(this.createFilter(queryString)) : companyNames;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
    },
    mounted() {
      const res = UserApi.findAllCname();
      res.then(rs => {
        this.companyNames = rs.data
      })
    }
  }
</script>

<style scoped>

</style>
