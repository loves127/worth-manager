<template>
  <div>
    <v-search
      ref="vSearch"
      @openDialog="openDialog"
      @onSearch="onSearch"/>

    <v-table
      :tableData="tableData"
      :vloading="vloading"
      @reflash="reflash"
      ref="table"
      @handleSelectionChange="handleSelectionChange"
      @openDialog="openDialog"/>

    <ftooter-pages
      :pagination="pagination"
      @deleteMany="deleteMany"
      @selectAll="selectAll"
      @canselAll="canselAll"
      @handleCurrentChange="handleCurrentChange"/>

    <v-dialog :centerDialogVisible="centerDialogVisible"
              :form="form"
              :panelTitle="panelTitle"
              :accountNoList="accountNoList"
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
  import {formatDate} from '@/utils/date'
  import TransferRecordApi from '@/api/transferRecord';
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
        panelTitle: '新增转账记录',
        accountNoList:[],
        form:{
          outAccount:'',
          inAccount: '',
          transferDate:'',
          transferAmount:'',
          // accountBalance:'',
          remark:''
        },
        vloading: false,
        tableData: [],
        multipleSelection: [], // 选中行
        pagination:{
          curPage: 1, // 默认当前页
          rows: 8, // 每页显示的数据
          total: 0 // 总条数
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 打开弹框
      openDialog(_title,_id) {
        this.panelTitle = _title;
        this.centerDialogVisible = true;
        if (this.panelTitle === '新增转账记录') {
          this.form = {};
          this.getAccountList();
        } else {
          const res = TransferRecordApi.findById({_id: _id});
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
      // 刷新表格
      reflash() {
        this.getList();
      },
      // 列表
      getList() {
        this.vloading = true;
        let params = _extend({rangeDate: ""}, this.pagination);
        const res = TransferRecordApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.vloading = false;
            this.tableData = data.data.map(item => {
              item.transferDate = formatDate(new Date(item.transferDate), 'yyyy-MM-dd')
              return item
            });
            this.pagination.total = data.total
          }
        })
      },
      // 新增转账记录
      onSubmit(){
        if (this.panelTitle === '新增转账记录') {
          this.form.transferDate = formatDate(new Date(), 'yyyy-MM-dd')
          const params = this.form;
          let res = TransferRecordApi.add(params);
          this.vloading = true;
          res.then((data) => {
            if (data.state === '200') {
              this.$message({
                message: '转账成功',
                type: 'success'
              });
              this.vloading = false;
              this.reflash();
              this.centerDialogVisible = false
            } else {
              this.$message.error(res.msg);
            }
          })
        } else {
          this.form.transferDate = formatDate(new Date(), 'yyyy-MM-dd')
          const param = this.form;
          this.vloading = true;
          let res = TransferRecordApi.update(param);
          res.then(() => {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.vloading = false;
            this.reflash();
            this.centerDialogVisible = false
          })
        }
      },
      // 按条件查询
      onSearch(_search){
        // 判断时间查询是否为空
        if (_search.rangeDate !== "") {
          _search.startDate = formatDate(new Date(_search.rangeDate[0]), 'yyyy-MM-dd');
          _search.endDate = formatDate(new Date(_search.rangeDate[1]), 'yyyy-MM-dd');
        }
        let params = _extend(_search, this.pagination);
        this.vloading = true;
        const res = TransferRecordApi.list(params);
        res.then(data => {
          if (data.state === '200') {
            this.vloading = false;
            this.tableData = data.data.map(item => {
              item.transferDate = formatDate(new Date(item.transferDate), 'yyyy-MM-dd')
              return item
            });
            this.pagination.total = data.total
          }
        })
      },
      // 点击当前页
      handleCurrentChange(_val) {
        let searchParams = this.$refs.vSearch.getSearchParams();
        this.pagination.curPage = _val;
        let params = _extend(this.pagination, searchParams);
        this.vloading = true;
        const res = TransferRecordApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.vloading = false;
            this.tableData = data.data.map(item => {
              item.transferDate = formatDate(new Date(item.transferDate), 'yyyy-MM-dd')
              return item
            });
            this.pagination.total = data.total
          }
        })
      },
      // 行多选
      handleSelectionChange(_val) {
        let _ids = []
        _ids = _val.map(item => {
          return item._id
        });
        this.multipleSelection = _ids;
      },
      // 账户列表
      getAccountList(){
        const res = AccountApi.list({});
        res.then((data) => {
          if (data.state === '200') {
            this.accountNoList = data.data;
          }
        })
      },

      // 批量删除
      deleteMany() {
        let that = this;
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '至少需要选中一个转账记录!',
            type: 'warning'
          });
          return
        }
        this.$confirm('此操作将删除选中转账记录信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let res = TransferRecordApi.delete({'_ids': this.multipleSelection});
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
      selectAll(){
        let selectDate = [];
        for(let i=0;i<this.pagination.rows;i++){
          if(this.tableData[i] !== undefined){
            selectDate.push(this.tableData[i])
          }
        }
        selectDate.forEach(row => {
          this.$refs.table.setSelectAll(row);
        });
      },
      // 取消全选
      canselAll(){
        this.$refs.table.canselAll();
      }
    },
    filters: {
    }
  }
</script>
