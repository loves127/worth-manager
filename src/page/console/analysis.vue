<template>
  <div class="quick-container">
    <el-row :gutter="10" style="background-color: #fff">
      <el-col :md="18">
        <div class="expenses-charts">
          <div id="myChart1"></div>
          <div id="myChart2" style="margin-top: 10px;"></div>
        </div>
      </el-col>
      <el-col :md="6" class="grid-content">
        <el-card class="box-card">
          <div slot="header">
            <span>与上月相比</span>
          </div>
          <div v-for="(r, index) in rate" :key="index" class="text-item">
            <span> {{r._id}}</span>
            <span>{{r.rate | toFiex2}}
              <i class="iconfont icon-plus-shiftup" v-show="r.rate>0" style="color: red;font-weight: bold"></i>
              <i class="iconfont icon-xiangxia" v-show="r.rate<0" style="color: green;font-weight: bold"></i>
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Card, Row, Col,Form,FormItem,Button} from 'element-ui';
  import ExpenditureApi from '@/api/analysis';
  import {formatDate} from '@/utils/date'
  export default {
    components: {
      ElCard: Card,
      ElRow: Row,
      ElCol: Col,
      ElFrom:Form,
      ElFromItem: FormItem,
      ElButton:Button
    },
    data() {
      return {
        pieData:[], // 当前月数据
        rate:[], // 月环比率
        lineData:{
          date:[],
          data:[]
        }, // 折线图数据
      }
    },
    created(){
      this.pieToShow({})
    },
    methods: {
      // 饼图数据
      pieToShow(_params){
        const res = ExpenditureApi.findToCharts(_params);
        res.then((data) => {
          if (data.state === '200') {
            this.pieData = data.pieData.map(item=>{
              return {value: item.sumMoney,name:item._id}
            });
            this.rate = data.rate
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
        let nameAry = _self.pieData.map(item=>{
          return item.name
        });
        let sumMoneyAry = _self.pieData.map(item=>{
          return item.value
        });
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
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#363e83',
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#363e83 ',
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '12',
              },
            },
          },
          xAxis: {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#363e83',
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '12',
              }
            },
            data: nameAry
          },
          series:
            {
            name: '金额',
            type: 'bar',
            itemStyle: {
              normal: {
                show: true,
                borderWidth: 0,
              }
            },
            zlevel: 2,
            barWidth: '10%',
            data:sumMoneyAry
          }
        });
        // 绘制图表
        myChart1.setOption({
          backgroundColor: '#00265f',
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
      }
    },
    filters:{
      toFiex2(v){
        if(v>0){
          return v.toFixed(2)+'%'
        } else{
          return -v.toFixed(2)+'%'
        }
      }
    }
  }
</script>

<style lang="less">
  .quick-container {
    .el-card__header{
      background-color: #020d22;
      padding: 10px;
      color: #fff;
    }
    .el-card__body{
      padding: 0;
    }
    .grid-content{
      line-height: 25px;
      /*margin-top: 10px;*/
      p{
        padding: 10px;
      }
    }
    .text-item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      position: relative;
      padding: 10px;
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid #ddd;
      color: #555;
      cursor: pointer;
      &:hover{
        background-color: #f5f5f5;
      }
      &:first-child{
        border-top-width: 0;
      }
    }
    .content {
      margin: auto;
      line-height: 25px;
      h4, p {
        font-size: 16px;
      }
      .iconfont {
        font-size: 25px;
      }
    }
    .sec1 {
      text-align: center;
      height: 80px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }
    hr {
      border-width: 0;
      border-top: 1px solid #eee;
    }
  }
  .expenses-charts{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /*padding: 10px 0;*/
    #myChart1,#myChart2{
      /*margin: 10px auto;*/
      width: 100%;
      height:500px;
      box-sizing: border-box;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 8px;
      box-shadow: 0 0 45px rgba(0,0,0,0.2);
    }
  }
</style>
