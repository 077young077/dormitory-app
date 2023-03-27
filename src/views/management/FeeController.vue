<template>
  <div>
    <div class="title">
      用户数据展示
    </div>
    <div class="pics">
      <div class="pic">
        <div id="myChart" :style="{width: '640px', height: '300px'}"></div>
      </div>
      <div class="pic">
        <div id="myChart2" :style="{width: '640px', height: '300px'}"></div>
      </div>
    </div>
    <el-divider />
    <div class="title">
      报修数据展示
    </div>
    <div class="pics">
      <div class="pic">
        <div id="myChart3" :style="{width: '640px', height: '300px'}"></div>
      </div>
      <div class="pic">
        <div id="myChart4" :style="{width: '640px', height: '300px'}"></div>
      </div>
    </div>
    <el-divider />
    <div class="title">
      其他数据展示
    </div>
    <div class="pics">
      <div class="pic">
        <!--      <div id="myChart3" :style="{width: '640px', height: '480px'}"></div>-->
      </div>
      <div class="pic">
        <!--      <div id="myChart4" :style="{width: '640px', height: '480px'}"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import * as echarts from 'echarts';

export default {
  name: "FeeController",
  mounted() {
    this.drawLine1();
    this.drawLine2();
    this.drawLine3();
    this.drawLine4();
  },
  data(){
    return{
      address:[]
    }
  },
  methods: {
    drawLine1(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart1'))
      // myChart.removeAttribute('_echarts_instance_');
      let option ={
        color: ['#42b983', '#8BC34A', '#91cd77', '#8BC34A', '#388E3C', '#4CAF50'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
      option && myChart.setOption(option);
    },
    drawLine2(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart2'))
      // myChart.removeAttribute('_echarts_instance_');
      let option ={
        color: ['#42b983', '#8BC34A', '#91cd77', '#8BC34A', '#388E3C', '#4CAF50'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
      option && myChart.setOption(option);
    },
    // drawLine1() {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = echarts.init(document.getElementById('myChart'))
    //   // myChart.removeAttribute('_echarts_instance_');
    //   let option = {
    //     title: {
    //       text: '各地区用户比例',
    //       subtext: '截止到今日',
    //       left: 'left',
    //       textStyle:{
    //         //文字颜色
    //         color:'#a8a8a8',
    //         //字体风格,'normal','italic','oblique'
    //         fontStyle:'normal',
    //         //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
    //         fontWeight:'bold',
    //         //字体系列
    //         fontFamily:'sans-serif',
    //         //字体大小
    //         fontSize:18
    //       }
    //     },
    //     toolbox: {
    //       feature: {
    //       }
    //     },
    //     color: ['#42b983', '#8BC34A', '#91cd77', '#8BC34A', '#388E3C', '#4CAF50'],
    //     series: [
    //       {
    //         name: '用户比例',
    //         type: 'pie',
    //         radius: [50, 150],
    //         center: ['50%', '60%'],
    //         roseType: 'area',
    //         itemStyle: {
    //           borderRadius: 8
    //         },
    //         data: []
    //       }
    //     ]
    //   }
    //   request.get("").then(res => {
    //     if (res.code === '0') {
    //       res.data.forEach(item => {
    //         option.series[0].data.push({name: item.address, value: item.count})
    //       })
    //       // 绘制图表
    //       myChart.setOption(option);
    //     }
    //   })
    //
    // },
    // drawLine2 (){
    //   let myChart2 = echarts.init(document.getElementById('myChart2'))
    //   // myChart2.removeAttribute('_echarts_instance_');
    //   // 基本柱状图
    //   const option = {
    //     xAxis: {
    //       axisLine: {
    //         show: false,    // 是否显示坐标轴轴线
    //         symbol: ['none', 'arrow'],     // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
    //         symbolSize: [10, 15],     // 轴线两端箭头大小，数值一表示宽度，数值二表示高度
    //         lineStyle: {
    //           color: '#a8a8a8',    // 坐标轴线线的颜色
    //           width: '2',    // 坐标轴线线宽
    //           type: 'solid',    // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
    //         },
    //       },
    //       type: 'category',
    //       data:[],
    //       axisTick: {
    //         alignWithLabel: true
    //       },
    //       axisLabel: {
    //         interval: 0,
    //         rotate: 15,
    //       }
    //     },
    //     yAxis: {
    //       type: 'value',
    //       axisLine: {
    //         show: false,    // 是否显示坐标轴轴线
    //         symbol: ['none', 'arrow'],     // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
    //         symbolSize: [10, 15],     // 轴线两端箭头大小，数值一表示宽度，数值二表示高度
    //         lineStyle: {
    //           color: '#a8a8a8',    // 坐标轴线线的颜色
    //           width: '2',    // 坐标轴线线宽
    //           type: 'solid',    // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
    //         },
    //       },
    //     },
    //     title: {
    //       text: '各地区用户比例',
    //       subtext: '截止到今日',
    //       left: 'left',
    //       textStyle:{
    //         //文字颜色
    //         color:'#a8a8a8',
    //         //字体风格,'normal','italic','oblique'
    //         fontStyle:'normal',
    //         //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
    //         fontWeight:'bold',
    //         //字体系列
    //         fontFamily:'sans-serif',
    //         //字体大小
    //         fontSize:18
    //       }
    //     },
    //     tooltip: {
    //       trigger: 'item'
    //     },
    //     color: ['#42b983', '#8BC34A', '#91cd77', '#8BC34A', '#388E3C', '#4CAF50'],
    //     series: [
    //       {
    //         type: "bar", //形状为柱状图
    //         data: [],
    //         showBackground: true,
    //         backgroundStyle: {
    //           color: 'rgba(243,236,236,0.2)'
    //         }
    //       }
    //     ]
    //   }
    //   request.get("").then(res => {
    //     if (res.code === '0') {
    //       res.data.forEach(item => {
    //         option.series[0].data.push({name: item.address, value: item.count})
    //
    //       })
    //     }
    //     for(var index in option.series[0].data){
    //       option.xAxis.data[index] = (option.series[0].data[index].name)
    //     }
    //     // console.log(option.xAxis.data)
    //     myChart2.setOption(option);
    //   })
    // },
    //
    drawLine3(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart3'))
      // myChart.removeAttribute('_echarts_instance_');
      let option ={
        color: ['#42b983', '#8BC34A', '#91cd77', '#8BC34A', '#388E3C', '#4CAF50'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
      option && myChart.setOption(option);
    },
    drawLine4(){
// 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart4'))
      // myChart.removeAttribute('_echarts_instance_');
      let option ={
        color: ['#42b983', '#8BC34A', '#91cd77', '#8BC34A', '#388E3C', '#4CAF50'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          selectedMode: false
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            startAngle: 180,
            label: {
              show: true,
              formatter(param) {
                return param.name + ' (' + param.percent * 2 + '%)';
              }
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' },
              {
                // make an record to fill the bottom 50%
                value: 1048 + 735 + 580 + 484 + 300,
                itemStyle: {
                  // stop the chart from rendering this piece
                  color: 'none',
                  decal: {
                    symbol: 'none'
                  }
                },
                label: {
                  show: false
                }
              }
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.title{
  color: #42b983;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 25px;
  font-weight: 800;
}
.pics{
  display: flex;
  flex-direction: row;
}
.pic{
  display: block;
  margin-left: 10px;
}
</style>