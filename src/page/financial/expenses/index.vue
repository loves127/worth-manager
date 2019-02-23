<template>
  <div>
    <!-- 搜索 -->
    <v-search
      ref="vSearch"
      :accountNameList="accountNameList"
      :accountNoList="accountNoList"
      @openDialog="openDialog"
      @changeAccount="changeAccount"
      @onSearch="onSearch"/>
    <!-- 表格 -->
    <v-table
      :tableData="tableData"
      :vloading="vloading"
      :totalMoney="totalMoney"
      :avgMoney="avgMoney"
      :minMoney="minMoney"
      :maxMoney="maxMoney"
      @reflash="reflash"
      ref="table"
      @handleSelectionChange="handleSelectionChange"
      @openDialog="openDialog"/>
    <!-- 底部 -->
    <ftooter-pages
      :pagination="pagination"
      @deleteMany="deleteMany"
      @selectAll="selectAll"
      @canselAll="canselAll"
      @handleCurrentChange="handleCurrentChange"/>
    <!-- 弹框 -->
    <v-dialog :centerDialogVisible="centerDialogVisible"
              :form="form"
              :panelTitle="panelTitle"
              :expenditureTypeList="expenditureTypeList"
              :accountList="accountList"
              :accountNameList="accountNameList"
              @onSubmit="onSubmit"
              @closeDialog="closeDialog"/>
   <!-- 图标 -->
    <!--<div class="expenses-charts">-->
      <!--<div id="myChart1" :style="{width: '100%', height: '500px'}"></div>-->
      <!--<div id="myChart2" :style="{width: '100%', height: '500px'}"></div>-->
    <!--</div>-->
  </div>

</template>
<script>
  import FtooterPages from '@/components/common/footerPages'
  import VDialog from './vdialog'
  import VSearch from './vsearch'
  import VTable from './vtable'
  import {_extend} from '@/utils/params'
  import {formatDate} from '@/utils/date'
  import ExpenditureApi from '@/api/expenditure';
  import expenditureTypeApi from '@/api/expenditureType';
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
        panelTitle: '新增支出',
        expenditureTypeList:[], // 支出类别
        accountList:[], // 账户列表
        accountNoList:[], //账号列表
        accountNameList:[], // 账户名称列表
        pieData:[], //饼图数据
        lineData:{
          date:[],
          data:[]
        }, // 折线图数据
        totalMoney:0.00, // 支出总额
        avgMoney:0.00, // 平均支出
        minMoney:0.00, // 最小开支
        maxMoney:0.00, // 最大开支
        form:{
          expenditureType:'',
          accountName: '',
          accountNo:'',
          recordDate:'',
          modifyDate:'',
          money:0,
          tag:'',
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
      this.getList();
      this.getAccountList();
    },
    methods: {
      // 打开弹框
      openDialog(_title,_id) {
        this.panelTitle = _title;
        this.centerDialogVisible = true;
        if (this.panelTitle === '新增支出') {
          this.form = {};
          this.getExpenditureTypeList();
          this.getAccountList();
        } else {
          const res = ExpenditureApi.findById({_id: _id});
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
        this.pieToShow({});
      },
      // 列表
      getList() {
        let params = _extend({rangeDate: ""}, this.pagination);
        this.vloading = true;
        const res = ExpenditureApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.vloading = false;
            this.tableData = data.data.map(item => {
              item.recordDate = formatDate(new Date(item.recordDate), 'yyyy-MM-dd');
              item.modifyDate = formatDate(new Date(item.modifyDate), 'yyyy-MM-dd');
              return item
            });
            this.pagination.total = data.total;
          }
        })
        this.pieToShow({});
        this.queryExDetail({});
      },
      // 新增支出
      onSubmit(){
        if (this.panelTitle === '新增支出') {
          this.form.recordDate = formatDate(new Date(), 'yyyy-MM-dd');
          this.form.modifyDate = formatDate(new Date(), 'yyyy-MM-dd');
          const params = this.form;
          let res = ExpenditureApi.add(params);
          this.vloading = true;
          res.then((data) => {
            if (data.state === '200') {
              this.$message({
                message: '新增成功',
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
          this.form.modifyDate = formatDate(new Date(), 'yyyy-MM-dd');
          const param = this.form;
          this.vloading = true;
          let res = ExpenditureApi.update(param);
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
        if(_search.rangeDate !== ""&&_search.rangeDate[0] !==null){
          _search.startDate =  formatDate(new Date(_search.rangeDate[0]), 'yyyy-MM-dd');
          _search.endDate =  formatDate(new Date(_search.rangeDate[1]), 'yyyy-MM-dd');
        }
        let params = _extend(_search, this.pagination);
        this.vloading = true;
        const res = ExpenditureApi.list(params);
        res.then(data => {
          if (data.state === '200') {
            this.vloading = false;
            this.tableData = data.data.map(item => {
              item.recordDate = formatDate(new Date(item.recordDate), 'yyyy-MM-dd')
              item.modifyDate = formatDate(new Date(item.modifyDate), 'yyyy-MM-dd');
              return item
            });
            this.pagination.total = data.total
          }
        });
        this.pieToShow(_search);
        this.queryExDetail(_search);
      },
      // 点击当前页
      handleCurrentChange(_val) {
        let searchParams = this.$refs.vSearch.getSearchParams();
        this.pagination.curPage = _val;
        let params = _extend(this.pagination, searchParams);
        this.vloading = true;
        const res = ExpenditureApi.list(params);
        res.then((data) => {
          if (data.state === '200') {
            this.vloading = false;
            this.tableData = data.data.map(item => {
              item.recordDate = formatDate(new Date(item.recordDate), 'yyyy-MM-dd')
              item.modifyDate = formatDate(new Date(item.modifyDate), 'yyyy-MM-dd');
              return item
            });
            this.pagination.total = data.total
          }
        })
      },
      // 查询账户列表
      getAccountList(){
        const res = AccountApi.list({});
        res.then((data) => {
          if (data.state === '200') {
           this.accountList = data.data;
            let accountNameArry = Array.from(new Set( this.accountList.map(item =>{
              return item.accountName;
            })));
            this.accountNameList = accountNameArry.map(item=>{
              return {accountName:item}
            });
          }
        })
      },
      // 根据账户名称查询账号
      changeAccount(v){
         let accountArry = this.accountList.filter(item=>{
           return item.accountName === v
         });
        let accountNoArry = Array.from(new Set(accountArry.map(item=>{
           return item.accountNo
        })));
        this.accountNoList = accountNoArry.map(item=>{
          return {accountNo: item}
        })
      },
      // 查询类目名称
      getExpenditureTypeList(){
        const res = expenditureTypeApi.list({});
        res.then((data) => {
          if (data.state === '200') {
            this.expenditureTypeList = data.data;
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
            message: '至少需要选中一个支出!',
            type: 'warning'
          });
          return
        }
        this.$confirm('此操作将删除选中支出信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let res = ExpenditureApi.delete({'_ids': this.multipleSelection});
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
      },
      // 饼图数据
      pieToShow(_params){
        const res = ExpenditureApi.findToPie(_params);
        res.then((data) => {
          if (data.state === '200') {
            this.pieData = data.pieData.map(item=>{
              return {value: item.sumMoney,name:item._id}
            });
            // 计算总额
            if(data.total.length>0){
              this.totalMoney = data.total[0].totalMoney;
            }else{
              this.totalMoney = 0;
            }
            this.lineData.date= data.lineData.map(item=>{
               return formatDate(new Date(item._id), 'yyyy-MM-dd')
            });
            this.lineData.data = data.lineData.map(item=>{
              return item.sumMoney
            });
            this.drawLine();
          }
        })
      },
      // 画图
      drawLine() {
        let _self = this;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart1'));
        let myChart1 = this.$echarts.init(document.getElementById('myChart2'));
        let namrAry = _self.pieData.map(item=>{
          return item.name
        })
        // 绘制图表
        myChart.setOption({
          backgroundColor: "#020d22",
          title: {
            "text": "支出类目分析",
            "left": "center",
            "y": "10",
            "textStyle": {
              "color": "#fff"
            }
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            top:'50',
            left:'20',
            x: 'left',
            textStyle: {
              color: "#fff"
            },
            data:namrAry,
            formatter: function (name) {
             let _v = _self.pieData.filter(item=>{
                return item.name === name
              });
              return   name +'   ['+_v[0].value+']';
            }
          },
          series: [{
            name: '金额',
            type: 'pie',
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },

            data: _self.pieData
          }]
        });
        // 绘制图表
        myChart1.setOption({
          backgroundColor: '#00265f',
          // title: {text: '个人账户支出分析', left: 'left'},
          title: {
            "text": "个人账户支出分析",
            "left": "center",
            "y": "10",
            "textStyle": {
              "color": "#fff"
            }
          },
          tooltip: {
            "trigger": "axis",
            "axisPointer": {
              "type": "cross",
              "crossStyle": {
                "color": "#384757"
              }
            }
          },
          xAxis: {
            "axisLabel": {
              "show": true,
              "textStyle": {
                "color": "#7d838b"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#063374",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: false,
            },
            data: this.lineData.date
          },
          yAxis: {
            name: '金额',
            axisLine: {
              show: false,
              lineStyle: {
                color: "#00c7ff",
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#063374",
              }
            }
          },
          series: [{
            name: '日期',
            type: 'line',
            markPoint: {
              data: [
                {type: 'max', name: '最大支出'},
                {type: 'min', name: '最小支出'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均支出'}
              ]
            },
            "itemStyle": {
              "normal": {
                "color": "#ffaa00"
              }
            },
            data: this.lineData.data,
            "smooth": true
          }]
        });
      },
      // 消费 sum avg max
      queryExDetail(_params) {
        const res = ExpenditureApi.findExDetail(_params);
        res.then(data => {
          this.avgMoney= data.avgEx;
          this.minMoney=data.minEx;
          this.maxMoney = data.maxEx;
          }
        )
      }
    },
    filters: {
    }
  }
</script>
<style lang="less">
  .expenses-charts{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    #myChart1,#myChart2{
      margin: 10px auto;
      box-sizing: border-box;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 8px;
      box-shadow: 0 0 45px rgba(0,0,0,0.2);
    }
  }
</style>
