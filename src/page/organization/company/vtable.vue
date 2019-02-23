<template>
  <el-table
    :data="tableData"
    border stripe
    v-loading="vloading"
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="ID"
      prop="_id">
    </el-table-column>
    <el-table-column
      label="公司名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
    <el-table-column label="操作" width="300" >
      <template slot-scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.row._id)">
          <i class="el-icon-edit"></i>
          编辑
        </el-button>
        <el-button
          size="small"
          type="warning"
          @click="handleDelete(scope.$index, scope.row)">
          <i class="el-icon-delete"></i>
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {Table, TableColumn, Button, Icon} from 'element-ui';
  import CompanyApi from '@/api/company';
  export default {
    name: "vtable",
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButton: Button,
      ElIcon: Icon
    },
    props:['tableData','vloading'],
    methods:{
      // 编辑公司
      handleEdit(_id){
        this.$emit('openDialog', '编辑公司', _id)
      },
      // 删除公司
      handleDelete(index, row){
        const id = row._id;
        let that = this;
        this.$confirm('此操作将删除该公司, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = CompanyApi.delete({_ids: id});
          res.then((data) => {
            if (data.state === '200') {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$emit('reflash');
            } else {
              that.$message({
                type: 'fail',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 行多选
      handleSelectionChange(_val){
        this.$emit('handleSelectionChange',_val);
      },
      // 设置全选
      setSelectAll(row){
        this.$refs.multipleTable.toggleRowSelection(row,true);
      },
      // 取消全选
      canselAll(){
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
</script>
