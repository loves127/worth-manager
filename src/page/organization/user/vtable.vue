<template>
  <el-table
    v-loading="vloading"
    :data="tableData"
    border stripe
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    style="width: 100%;">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="ID" width="55">
      <template slot-scope="scope">
        <span>{{ scope.row._id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="80">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>性别: {{ scope.row.sex}}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="性别" width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.sex}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="入职日期"
      width="140">
      <template slot-scope="scope">
        <el-icon name="time"/>
        <span style="margin-left: 10px">{{ scope.row.startDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      width="200"
      label="联系方式">
      <template slot-scope="scope">
        <i class="el-icon-phone"></i>
        <span>{{ scope.row.tellphone }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="邮箱"
      width="200">
      <template slot-scope="scope">
        <!--<i class="el-icon-message"></i>-->
        <span>{{ scope.row.eMail }}</span>
      </template>
    </el-table-column>
    <el-table-column label="公司" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.company }}</span>
      </template>
    </el-table-column>
    <el-table-column label="部门" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.department }}</span>
      </template>
    </el-table-column>
    <el-table-column label="岗位" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.post }}</span>
      </template>
    </el-table-column>
    <el-table-column
      width="180"
      label="地址">
      <template slot-scope="scope">
        <span>{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    <el-table-column label="备注" width="300">
      <template slot-scope="scope">
        <span>{{ scope.row.remark }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="small" @click="handleEdit(scope.row._id)">
          <i class="el-icon-edit"></i>
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">
          <i class="el-icon-delete"></i>
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {Table, TableColumn, Tag, Popover, Button, Autocomplete, Icon} from 'element-ui';
  import UserApi from '@/api/user';
  export default {
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButton: Button,
      ElPopover: Popover,
      ElTag: Tag,
      ElAutocomplete: Autocomplete,
      ElIcon: Icon
    },
    props: ['tableData', 'vloading'],
    data() {
      return {
        multipleSelection: [], // 选中行
      }
    },
    methods: {
      // 编辑用户
      handleEdit(_id) {
        this.$emit('openDialog', '编辑用户', parseInt(_id))
      },
      // 删除用户
      handleDelete(index, row) {
        const id = row._id;
        let that = this;
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = UserApi.delete({_ids: id});
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
