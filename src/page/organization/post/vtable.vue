<template>
  <el-table
    :data="tableData"
    v-loading="vloading"
    border stripe
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="_id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="岗位名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间">
    </el-table-column>
    <!--<el-table-column-->
      <!--prop="remark"-->
      <!--label="备注信息">-->
    <!--</el-table-column>-->
    <el-table-column
      prop="state"
      label="状态">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium" :type="scope.row.state==='启用'?'success':'danger'">{{ scope.row.state }}</el-tag>
        </div>
      </template>
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
        <el-button
          size="small"
          :type="scope.row.state==='启用'?'danger':'success'"
          @click="handleState(scope.$index, scope.row)">
          <!--<i :class="scope.row.state==='启用'?'el-icon-circle-check':'el-icon-circle-close'"></i>-->
          {{scope.row.state==='启用'?'停用':'启用'}}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {Table, TableColumn, Button, Icon, Tag} from 'element-ui';
  import PostApi from '@/api/post';
  export default {
    name: "vtable",
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButton: Button,
      ElIcon: Icon,
      ElTag: Tag
    },
    props:['tableData','vloading'],
    data(){
      return{
      }
    },
    methods:{
      // 编辑公司
      handleEdit(_id){
        this.$emit('openDialog', '编辑岗位', parseInt(_id))
      },
      // 更新状态
      handleState(index, row){
        console.log(row)
        let _state = row.state === '启用'?'停用':'启用';
        let params={
          _id: row._id,
          state:_state
        };
        let res = PostApi.findByIdAndUpdate(params)
        res.then(() => {
          this.$message({
            message: _state+'成功',
            type: 'success'
          });
          this.$emit('reflash');
        })
      },
      // 删除公司
      handleDelete(index, row){
        const id = row._id;
        let that = this;
        this.$confirm('此操作将删除该岗位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = PostApi.delete({_ids: id});
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
