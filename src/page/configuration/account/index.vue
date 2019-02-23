<template>
  <div>
    <v-search
      ref="vSearch"
      :accountNoList="accountNoList"
      @openDialog="openDialog"
      @onSearch="onSearch"/>

    <v-table :tableData="tableData"
             :vloading="vloading"
             ref="table"
             @reflash="reflash"
             @handleSelectionChange="handleSelectionChange"
             @openDialog="openDialog"/>

    <ftooter-pages
      :pagination="pagination"
      :multipleSelection="multipleSelection"
      @deleteMany="deleteMany"
      @selectAll="selectAll"
      @canselAll="canselAll"
      @handleCurrentChange="handleCurrentChange"/>

    <v-dialog :centerDialogVisible="centerDialogVisible"
              :form="form"
              :panelTitle="panelTitle"
              @onSubmit="onSubmit"
              @closeDialog="closeDialog"/>
  </div>
</template>

<script>
  import FtooterPages from '@/components/common/footerPages'
  import VDialog from './vdialog'
  import VSearch from './vsearch'
  import VTable from './vtable'
  import {_extend} from '@/utils/params'
  import AccountApi from '@/api/account';

  export default {
    components: {
      FtooterPages,
      VDialog,
      VSearch,
      VTable
    },
    data() {
      return {
        centerDialogVisible: false,
        panelTitle: '新增账户',
        accountNoList:[], // 账号列表
        vloading: false,
        form: {
          accountName: '',
          bankName: '',
          accountNo: '',
          initMoney: '',
          balance: '',
          remark: ''
        },
        tableData: [],
        multipleSelection: [], // 选中行
        pagination: {
          curPage: 1, // 默认当前页
          rows: 8, // 每页显示的数据
          total: 0 // 总条数
        }
      }
    },
    created() {
      this.getList()
      this.getAccountList()
    },
    methods: {
      // 打开弹框
      openDialog(_title, _id) {
        this.panelTitle = _title;
        this.centerDialogVisible = true;
        if (this.panelTitle === '新增账户') {
          this.form = {};
        } else {
          const res = AccountApi.findById({_id: _id})
          res.then(data => {
            if (data.state === '200') {
              this.form = data.data
            }
          });
        }
      },
      // 关闭弹框
      closeDialog() {
        this.centerDialogVisible = false
      },
      // 列表
      getList() {
        let params = this.pagination;
        this.vloading = true;
        const res = AccountApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.tableData = data.data
            this.pagination.total = data.total
          }
        }).finally(() => {
          this.vloading = false
        })
      },
      // 刷新表格
      reflash() {
        this.getList()
      },
      // 查询
      onSearch(_search) {
        let params = _extend(_search, this.pagination);
        const res = AccountApi.list(params)
        res.then(data => {
          if (data.state === '200') {
            this.tableData = data.data
            this.pagination.total = data.total
          }
        }).catch((error) => {
          this.$message({
            message: '请检查服务器是否连接正常!',
            type: 'error'
          });
        }).finally(() => {
          this.vloading = false
        })
      },
      // 点击当前页
      handleCurrentChange(_val) {
        let searchParams = this.$refs.vSearch.getSearchParams();
        this.pagination.curPage = _val;
        let params = _extend(this.pagination, searchParams);
        const res = AccountApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.tableData = data.data
            this.pagination.total = data.total
          }
        })
      },
      // 账号列表
      getAccountList(){
        this.vloading = true;
        const res = AccountApi.list({});
        res.then((data) => {
          if (data.state === '200') {
            let newArry = Array.from(new Set( data.data.map(item =>{
              return item.accountNo
            })));
            this.accountNoList = newArry.map(item=>{
              return {accountNo:item}
            });
          }
        }).finally(() => {
          this.vloading = false
        })
      },
      // 新增岗位
      onSubmit() {
        if (this.panelTitle === '新增账户') {
          const params = this.form;
          let res = AccountApi.add(params);
          res.then((data) => {
            if (data.state === '200') {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.reflash();
              this.centerDialogVisible = false
            } else {
              this.$message.error(res.msg);
            }
          })
        } else {
          const param = this.form;
          let res = AccountApi.update(param);
          res.then(() => {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.reflash();
            this.centerDialogVisible = false
          })
        }
      },
      // 行多选
      handleSelectionChange(_val) {
        let _ids = []
        _ids = _val.map(item => {
          return item._id
        });
        this.multipleSelection = _ids;
      },
      // 批量删除
      deleteMany() {
        let that = this;
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '至少需要选中一个账户!',
            type: 'warning'
          });
          return
        }
        this.$confirm('此操作将删除选中账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let res = AccountApi.delete({'_ids': this.multipleSelection});
          res.then((data) => {
            if (data.state === '200') {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.reflash()
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
      // 全选
      selectAll() {
        let selectDate = [];
        for (let i = 0; i < this.pagination.rows; i++) {
          if (this.tableData[i] !== undefined) {
            selectDate.push(this.tableData[i])
          }
        }
        selectDate.forEach(row => {
          this.$refs.table.setSelectAll(row);
        });
      },
      // 取消全选
      canselAll() {
        this.$refs.table.canselAll();
      }
    }
  }
</script>
