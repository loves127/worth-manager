<template>
  <div style="display: flex;flex-direction: row;flex-wrap: wrap;align-content: center;">
    <el-card class="box-card" shadow="hover" :key="i" v-for="(item,i) in tableData">
      <div slot="header" class="clearfix">
        <span style="font-size: 15px;font-weight: 700">{{item.accountName}}</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text" @click="handleDelete(i, item)">删除</el-button>-->
        <!--<el-button style="float: right; padding: 3px 0;" type="text" @click="handleEdit(item._id)">-->
          <!--编辑-->
        <!--</el-button>-->
      </div>
      <div class="item">
        <span class="t_ht"> 账号</span>
        <label class="text">{{item.accountNo}}</label>
      </div>
      <div class="item">
        <span class="t_ht"> 初始金额</span>
        <label for="" class="text">{{ item.initMoney | fixedTo2 }}</label>
      </div>
      <div class="item">
        <span class="t_ht"> 账户余额</span>
        <label for="" class="text">{{ item.balance | fixedTo2 }}</label>
      </div>
      <!--<div class="item">-->
        <!--<span class="t_ht"> 备注</span>-->
        <!--<label for="" class="text">{{item.remark}}</label>-->
      <!--</div>-->
    </el-card>
    <no-result title="暂无账号信息" v-if="tableData.length===0"/>
  </div>
</template>

<script>
  import {Table, TableColumn, Button, Icon, Tag, Card} from 'element-ui';
  import NoResult from '@/components/common/no-result'
  import AccountApi from '@/api/account';
  export default {
    name: "vtable",
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButton: Button,
      ElIcon: Icon,
      ElTag: Tag,
      ElCard: Card,
      NoResult
    },
    props: ['tableData', 'vloading'],
    data(){
      return {}
    },
    methods: {
      // 编辑公司
//      handleEdit(_id){
//        this.$emit('openDialog', '编辑账户', parseInt(_id))
//      },
      // 更新状态
      handleState(index, row){
        console.log(row)
        let _state = row.state === '启用' ? '停用' : '启用';
        let params = {
          _id: row._id,
          state: _state
        };
        let res = AccountApi.findByIdAndUpdate(params)
        res.then(() => {
          this.$message({
            message: _state + '成功',
            type: 'success'
          });
          this.$emit('reflash');
        })
      },
//    handleDelete(index, row){
//        const id = row._id;
//        let that = this;
//        this.$confirm('此操作将删除该账户, 是否继续?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//          const res = AccountApi.delete({_ids: id});
//          res.then((data) => {
//            if (data.state === '200') {
//              that.$message({
//                type: 'success',
//                message: '删除成功!'
//              });
//              this.$emit('reflash');
//            } else {
//              that.$message({
//                type: 'fail',
//                message: '删除失败!'
//              });
//            }
//          })
//        }).catch(() => {
//          that.$message({
//            type: 'info',
//            message: '已取消删除'
//          });
//        });
//      },
      handleSelectionChange(_val){
        this.$emit('handleSelectionChange', _val);
      },
      // 设置全选
      setSelectAll(row){
        this.$refs.multipleTable.toggleRowSelection(row, true);
      },
      // 取消全选
      canselAll(){
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
</script>
<style>
  .t_ht {
    font-size: 15px;
  }

  .text {
    font-size: 15px;
    color: #999;
    float: right;
  }

  .item {
    margin-bottom: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 400px;
    margin: 10px 15px;
  }
</style>
