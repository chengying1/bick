import React,{Component} from 'react'
import Header from '../../components/header'
import {Card} from 'antd'
import './detail.less'
import axios from "../../axios"

class Details extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        this.getData()
    }
    getData = () => {
        const {id} = this.props.match.params
        axios.get('/order/detail', {id}).then(res => {
            if(res.code == 0){
                this.initMap(res.result)
            }
        })
    }
     // 创建地图实例
    initMap = (result) => {
        const BMap = window.BMap
        this.map = new BMap.Map("bmap-container");          // 创建地图实例
        this.map.enableScrollWheelZoom(true);   this.addControl()
        this.drawPolyline(result.position_list)
        this.drawServiceArea(result.area)
    }
    //添加控件
    addControl = () => {
        const BMap = window.BMap
        const map = this.map
        map.addControl(new BMap.NavigationControl({
            anchor:window.BMAP_ANCHOR_TOP_RIGHT
        }));
        map.addControl(new BMap.ScaleControl({
            anchor:window.BMAP_ANCHOR_TOP_RIGHT
        }));
    }
    //绘制路径折线图
    drawPolyline = (position_list) => {
       const BMap = window.BMap
       const map = this.map

        let startPoint = position_list[0]
        let endPoint = position_list[position_list.length-1]

        //绘制一个百度地图的起始点
        let startBmapPoint = new BMap.Point(startPoint.lon, startPoint.lat)
        let endBmapPoint = new BMap.Point(endPoint.lon, endPoint.lat)

        //新建一个起始Icon
        let startIcon = new BMap.Icon("/imgs/start_point.png", new BMap.Size(36, 42), {
             imageSize:new BMap.Size(36,42)
        });
        let endIcon = new BMap.Icon("/imgs/end_point.png", new BMap.Size(36, 42), {
            imageSize:new BMap.Size(36,42)
        });

        //新建一个标注，将相应的Icon添加到标注当中去
        let startMarker = new BMap.Marker(startBmapPoint, {icon: startIcon})
        let endMarker = new BMap.Marker(endBmapPoint,{icon: endIcon})

        //添加起始坐标点
        map.addOverlay(startMarker);
        map.addOverlay(endMarker);

        //设置地图中心点
        this.map.centerAndZoom(startBmapPoint, 11)

        //绘制折线
        let polyline = new BMap.Polyline(position_list.map(point => {
            return new BMap.Point(point.lon, point.lat)
        }),
            {strokeColor:"#1869AD", strokeWeight:3, strokeOpacity:1}
        );
        map.addOverlay(polyline);

    }
    //绘制服务区
    drawServiceArea = (area) => {
        const BMap = window.BMap
        const map = this.map

        let serviceArr = area.map(point => {
            return new BMap.Point(point.lon, point.lat)
        })

        const polygon = new BMap.Polygon(serviceArr, {
            strokeColor: '#ff0000',
            fillColor: '#ff6700',
            fillOpacity: 0.5
        })

        map.addOverlay(polygon)
    }
    render(){
        return(
            <div className='detail'>
                <Header type='common'> </Header>
                <Card>
                    <div className='bmap-warp' id='bmap-container'></div>
                </Card>
            </div>
        )
    }
}
export default Details;
