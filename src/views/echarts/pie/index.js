import React,{Component} from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import ReactEcharts from 'echarts-for-react'
import echartsTheme from '../themeLight'
import {Card} from 'antd'

class Pie extends Component {

    componentWillMount(){
        echarts.registerTheme('旺财', echartsTheme)
    }
    pie1 = () => {
        return{
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '20',
                top:'20',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : '80%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:1548, name:'周五'},
                        {value:1548, name:'周六'},
                        {value:1548, name:'周日'}
                    ],
                }
            ]
        }
    }
    pie2 = () => {
        return{
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '20',
                top:'20',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : ['60%','80%'],
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:1548, name:'周五'},
                        {value:1548, name:'周六'},
                        {value:1548, name:'周日'}
                    ],
                }
            ]
        }
    }
    render(){
        return(
            <div>
                <Card title='饼状图一'>
                    <ReactEcharts option={this.pie1()} theme='旺财'></ReactEcharts>
                </Card>
                <Card title='饼状图二'>
                    <ReactEcharts option={this.pie2()} theme='旺财'></ReactEcharts>
                </Card>
            </div>
        )
    }
}
export default Pie;