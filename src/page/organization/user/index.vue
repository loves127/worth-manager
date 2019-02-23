<template>
  <div>
    <v-search
      ref="vSearch"
      :departmentNames="departmentNames"
      :postNames="postNames" @onSearch="onSearch"
      @openDialog="openDialog"/>

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
      @handleCurrentChange="handleCurrentChange">
    </ftooter-pages>

    <v-dialog :centerDialogVisible="centerDialogVisible"
              :panelTitle="panelTitle"
              :companyNames="companyNames"
              :postNames="postNames"
              :departmentNames="departmentNames"
              :form="form"
              @reflash="reflash"
              @onSubmit="onSubmit"
              @closeDialog="closeDialog"/>
  </div>
</template>

<script>
  import UserApi from '@/api/user';
  import {formatDate} from '@/utils/date'
  import {_extend} from '@/utils/params'
  import VSearch from "./vsearch";
  import VTable from './vtable'
  import VDialog from './vdialog'
  import FtooterPages from '@/components/common/footerPages'
  export default {
    components: {
      VSearch,
      VTable,
      VDialog,
      FtooterPages
    },
    data() {
      return {
        tableData: [], // 表格数据
        centerDialogVisible: false, // 弹框
        panelTitle: '', // 弹框标题
        vloading: true, // 是否加载中
        companyNames: [],  // 公司名称
        postNames: [], // 岗位名称
        departmentNames: [], // 部门名称
        form: {
          name: '',
          sex: '',
          eMail: '',
          startDate: '',
          tellphone: '',
          address: '',
          post: '',
          department: '',
          company: '',
          remark: ''
        },//用户表单
        multipleSelection: [], // 选中行
        pagination: {
          curPage: 1, // 默认当前页
          rows: 9, // 每页显示的数据
          total: 0 // 总条数
        }
      }
    },
    created() {
      this.getList(this.pagination.rows);
      this.getPostList();
      this.getDepartmentList();
    },
    methods: {
      // 获取列表
      getList() {
        let params = {
          curPage: this.pagination.curPage,
          rows: this.pagination.rows
        };
        this.vloading = true;
        const res = UserApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.tableData = data.data;
            this.pagination.total = data.total;
          }
        }).catch(err=>{
          // 异常处理
        }).finally(()=>{
          this.vloading = false
        })
      },
      // 按多条件查询
      onSearch(_search) {
        let params = _extend(_search, this.pagination);
        this.vloading = true;
        const res = UserApi.list(params)
        res.then(data => {
          if (data.state === '200') {
            this.tableData = data.data
            this.pagination.total = data.total
          }
        }).catch(err=>{
        }).finally(()=>{
          this.vloading = false;
        })
      },
      // 打开弹框
      openDialog(_title, id) {
        this.panelTitle = _title;
        this.centerDialogVisible = true
        if (_title === '新增用户') {
          this.form = {};
          this.getCompanyList();
          this.getDepartmentList();
          this.getPostList();
        } else {
          this.getCompanyList();
          this.getDepartmentList();
          this.getPostList();
          const res = UserApi.findById({_id: id})
          res.then(data => {
            this.vloading = false;
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
      // 格式化日期
      formatDate() {
        if (this.form.startDate === undefined) {
          this.form.startDate = formatDate(new Date(), 'yyyy-MM-dd')
        }
        if (typeof this.form.startDate === 'object') {
          this.form.startDate = formatDate(this.form.startDate, 'yyyy-MM-dd')
        }
      },
      // 表单提交
      onSubmit() {
        if (this.panelTitle === '新增用户') {
          this.formatDate();
          const params = this.form;
          let res = UserApi.add(params);
          res.then((data) => {
            if (data.state === '200') {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.reflash();
            } else {
              this.$message.error(res.msg);
            }
          })
        } else {
          this.formatDate();
          const param = this.form;
          let res = UserApi.update(param);
          res.then(() => {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.reflash();
          })
        }
      },
      // 点击当前页
      handleCurrentChange(_val) {
        let searchParams = this.$refs.vSearch.getSearchParams();
        this.pagination.curPage = _val;
        let params = _extend(this.pagination, searchParams);
        const res = UserApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.tableData = data.data;
            this.pagination.total = data.total
          }
        }).catch(err=>{
        }).finally(()=>{
          this.vloading = false;
        })
      },
      // 刷新表格数据和分页
      reflash() {
        // 关闭弹框
        this.centerDialogVisible = false;
        // 刷新表格
        this.getList();
      },
      // 获取公司列表
      getCompanyList() {
        const res = UserApi.companyList();
        res.then(rs => {
          this.companyNames = rs.data
        })
      },
      // 获取部门列表
      getDepartmentList() {
        const res = UserApi.departmentList();
        res.then((data) => {
          if (data.state === '200') {
            this.departmentNames = data.data
          }
        })
      },
      // 获取岗位名称
      getPostList() {
        const res = UserApi.postList();
        res.then((data) => {
          if (data.state === '200') {
            this.postNames = data.data
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
      // 批量删除
      deleteMany() {
        let that = this;
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '至少需要选中一个用户!',
            type: 'warning'
          });
          return
        }
        this.$confirm('此操作将删除选中用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let res = UserApi.delete({'_ids': this.multipleSelection});
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
    }
  }
</script>
