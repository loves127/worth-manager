<template>
  <div class="income-item">
    <header>
      <span class="title">支出</span>
      <el-button type="primary" @click="openDialog('新增支出类型')">新增</el-button>
    </header>
    <el-table
      :data="tableData"
      v-loading="vloading"
      border
      style="width: 100%">
      <el-table-column
        label="类型">
        <template slot-scope="scope">
          <i class="iconfont" :class="scope.row.icon"></i>
          <span>{{ scope.row.expenditureType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="openDialog('编辑支出类型',scope.row._id)">
            <i class="el-icon-edit"></i>
            编辑
          </el-button>
          <el-button
            size="small"
            type="warning"
            @click="handleDelete(scope.row)">
            <i class="el-icon-delete"></i>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer>
      <div style="margin-right: 30px;color: #fff;">共{{pagination.total}}条</div>
      <div style="color: #fff; margin-right: 20px;">当前第 [{{pagination.curPage}}] 页</div>
      <el-button-group>
        <el-button type="primary" @click="prePage"><i class="el-icon-arrow-left el-icon--left"></i>上一页</el-button>
        <el-button type="primary" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </footer>
    <el-dialog
      :title="panelTitle"
      :visible.sync="dialogVisible"
      class="post-list__dialog"
      :show-close="false"
      :close-on-click-modal="false"
      center="true">
      <el-form :model="form" :label-position="labelPosition">
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="1">
              <i class="iconfont icon-show" :class="form.icon"></i>
            </el-col>
            <el-col :span="2" style="margin-left: 30px;">
              <el-button type="success" @click="selectIcon">
                <i class="iconfont icon-chaxun"></i>选择
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.expenditureType" auto-complete="off" placeholder="请输入支出类型"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
    </el-dialog>
    <icon-select
      ref="iconRef"
      :iconDialogVisible="iconDialogVisible"
      @closeDialog="closeDialog"
      @onSubmitToSelect="onSubmitToSelect"
    />
  </div>
</template>

<script>
  import {Button, Table, TableColumn, ButtonGroup, Dialog, Form, FormItem, Input, Row, Col} from 'element-ui'
  import IconSelect from './icon-select'
  import expenditureTypeApi from '@/api/expenditureType';

  export default {
    name: "income-item",
    components: {
      ElButton: Button,
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButtonGroup: ButtonGroup,
      ElDialog: Dialog,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      IconSelect,
      ElRow: Row,
      ElCol: Col

    },
    data() {
      return {
        tableData: [],
        form: {
          icon:'',
          expenditureType: ''
        },
        vloading: false,
        iconDialogVisible: false,//图标弹框
        panelTitle: '新增支出类型',
        dialogVisible: false,
        formLabelWidth: '100px',
        labelPosition: 'right',
        pagination: {
          curPage: 1, // 默认当前页
          rows: 10, // 每页显示的数据
          total: 0 // 总条数
        }
      }
    },
    created() {
      this.getList(this.pagination);
    },
    methods: {
      // 打开弹框
      openDialog(_title, _id) {
        this.dialogVisible = true;
        this.panelTitle = _title;
        if (this.panelTitle === '新增支出类型') {
          this.form = {};
        } else {
          const res = expenditureTypeApi.findById({_id: _id})
          res.then(data => {
            if (data.state === '200') {
              this.form = data.data
            }
          });
        }
      },
      // 新增或编辑收入类型
      onSubmit() {
        if (this.panelTitle === '新增支出类型') {
          const params = this.form;
          let res = expenditureTypeApi.add(params);
          res.then((data) => {
            if (data.state === '200') {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              let params = {
                curPage: 1, // 默认当前页
                rows: 10, // 每页显示的数据
              };
              this.getList(params);
              this.dialogVisible = false
            } else {
              this.$message.error(res.msg);
            }
          })
        } else {
          const param = this.form;
          let res = expenditureTypeApi.update(param);
          res.then(() => {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            let params = {
              curPage: 1, // 默认当前页
              rows: 10, // 每页显示的数据
            };
            this.getList(params);
            this.dialogVisible = false
          })
        }
      },
      // 获取收入类型列表
      getList(params) {
        this.vloading = true;
        const res = expenditureTypeApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.tableData = data.data;
            this.pagination.total = data.total
          }
        }).finally(() => {
          this.vloading = false
        })
      },
      // 上一页
      prePage() {
        if (this.pagination.curPage <= 1) {
          console.log('不能上一页了');
          return
        }
        this.pagination.curPage--;
        let params = this.pagination;
        this.getList(params)
      },
      // 下一页
      nextPage() {
        if (this.pagination.curPage >= Math.ceil(this.pagination.total / 10.0)) {
          console.log('不能下一页了');
          return
        }
        this.pagination.curPage++;
        let params = this.pagination;
        this.getList(params)
      },
      handleDelete(row) {
        const id = row._id;
        let that = this;
        this.$confirm('此操作将删除该支出类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = expenditureTypeApi.delete({_ids: id});
          res.then((data) => {
            if (data.state === '200') {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              let params = {
                curPage: 1, // 默认当前页
                rows: 10, // 每页显示的数据
              };
              this.getList(params);
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
      //选择图标
      selectIcon(){
        this.iconDialogVisible = true
      },
      //关闭弹框
      closeDialog(){
        this.iconDialogVisible = false
      },
      // 确认图标选中
      onSubmitToSelect(){
        this.iconDialogVisible = false;
        this.form.icon = this.$refs.iconRef.getIncon();

      }
    }
  }
</script>

<style lang="less">
  .income-item {
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 5px 10px;
      background-color: #001529;
      line-height: 40px;
      color: #fff;
      .title {
        font-size: 18px;
      }
    }
    footer {
      display: flex;
      align-items: center;
      height: 45px;
      background-color: #001529;
      justify-content: flex-end;
      padding: 0 10px;
      box-sizing: border-box;
      .el-button-group {
      }
    }
  }
</style>
