import React,{Component} from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import echartsTheme from '../echartTheme'
//引入bar模块
import 'echarts/lib/chart/bar'
// 引入组件
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react'

class Bar extends Component {

    componentWillMount(){
        echarts.registerTheme('旺财', echartsTheme)
    }
    bar1 = () => {
        return{
            title: {
                text: 'OFO周订单'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
    }
    bar2 = () => {
        return{
            title: {
                text: '用户骑行订单'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            legend: {
                data: ['OFO','摩拜', '小蓝单车']
            },
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'OFO',
                    type:'bar',
                    data:[500, 1000, 1600, 3000, 2800, 2600, 2870]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [600, 1200, 1800, 5000, 6000, 8000, 10000]
                },
                {
                    name: '小蓝单车',
                    type: 'bar',
                    data: [300, 600, 800, 1800, 2000, 1500, 1000]
                }
            ]
        }
    }
    render(){
        return(
            <div>
                <Card title='柱状图一'>
                    <ReactEcharts option={this.bar1()} theme='旺财'></ReactEcharts>
                </Card>
                <Card title='柱状图二'>
                    <ReactEcharts option={this.bar2()} theme='旺财'></ReactEcharts>
                </Card>
            </div>
        )
    }
}
export default Bar;