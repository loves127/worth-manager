<template>
  <div class="table">
    <div class="table-hd">
      平均消费 <span>{{avgMoney | fixedTo2}}元</span>
      最低消费 <span>{{minMoney | fixedTo2}}元</span>
      最高消费 <span>{{maxMoney | fixedTo2}}元</span>
      支出总额 <span>{{totalMoney | fixedTo2}}元</span>
    </div>
    <el-table
      :data="tableData"
      border stripe
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      v-loading="vloading">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="类别"
        prop="expenditureType">
      </el-table-column>
      <el-table-column
        label="账户"
        width="100px"
        prop="accountName">
      </el-table-column>
      <el-table-column
        label="账号"
        width="150px"
        prop="accountNo">
      </el-table-column>
      <el-table-column
        label="日期"
        width="150px"
        prop="recordDate">
      </el-table-column>
      <el-table-column
        width="150px"
        label="更新日期"
        prop="modifyDate">
      </el-table-column>
      <el-table-column
        width="120px"
        label="金额">
        <template slot-scope="scope">
          <span>{{ scope.row.money | fixedTo2 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="200px"
        prop="remark">
      </el-table-column>
      <el-table-column label="操作" width="200px" fixed="right">
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
  </div>
</template>

<script>
  import {Table, TableColumn, Button, Icon,Tag} from 'element-ui';
  import ExpenditureApi from '@/api/expenditure';
  export default {
    name: "vtable",
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButton: Button,
      ElIcon: Icon,
      ElTag:Tag
    },
    props:['tableData', 'vloading','totalMoney','avgMoney','minMoney','maxMoney'],
    methods:{
      // 编辑收入类别
      handleEdit(_id){
        this.$emit('openDialog', '编辑收入', _id)
      },
      // 删除部门
      handleDelete(index, row){
        const id = row._id;
        let that = this;
        this.$confirm('此操作将删除该收入信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = ExpenditureApi.delete({_ids: id});
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
<style lang="less">
.table{
  &-hd{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 50px;
    line-height: 50px;
    width: 100%;
    color: #fff;
    font-size: 18px;
    /*line-height: 50px;*/
    background-color: #909399;
    webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    padding: 0 20px;
    box-sizing: border-box;
    text-align: right;
    >span{
      font-size: 18px;
      color: brown;
      margin-left: 5px;
      align-self: flex-end;
      margin-right: 20px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
}
</style>
