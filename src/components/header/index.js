import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './index.less'
import {formatDate,axios} from '../../utils'
import {connect} from 'react-redux'



class Header extends Component {


    state={
        time:'2018-08-01 16:30:30',
        weather:'气温低'
    }
getTime = () => {
    setInterval(() => {
        // let unixDate = new Date()
        let timeStr = formatDate()
        this.setState({
            time:timeStr
        })
    },1000)
}
getWeather = () => {
    axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`).then(res => {
        console.log(res)
        let weather = res.data.forecast[0]
        console.log(weather)
        let weatherStr = `${weather.low} ~ ${weather.high}  ${weather.fx}  ${weather.fl}`
        this.setState({
            weather:weatherStr
        })
        })
}
componentWillMount(){
        this.getWeather()
        this.getTime()
}

    render(){
        return(
            <div className='header-wrap'>
                <div className={this.props.type == 'common' ? "user-infos clearfix" : "user-info clearfix"}>
                    {
                        this.props.type == 'common' ? <h1 style={{color: '#fff', float: 'left'}}>共享单车后台系统</h1> : ''
                    }
                    <div className='flr'>
                        <Link to='/login'>退出</Link>
                    </div>
                    <div className="user-detail flr">
                        欢迎 <span className='username'>张怡宁</span>
                    </div>
                </div>
                {
                    this.props.type == 'common' ? '' :

                <div className="weather-wrap clearfix">
                    <div className="breadcrumb fll">
                        {this.props.menuText}
                    </div>
                    <div className="weather flr clearfix">
                        <div className="date fll">
                            {this.state.time}
                        </div>
                        <div className="weather-detail fll">
                            {this.state.weather}
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}
//connect接受两个参数，mapStateToProps和mapDispatchToProps，这两个参数都是函数
export default connect(
    function mapStateToProps(state) {
        return{
            menuText:state.menuItemText
        }
    }
)(Header);