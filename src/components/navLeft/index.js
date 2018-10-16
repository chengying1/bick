import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import './index.less'
import {connect} from 'react-redux'
import ActionCreators from '../../redux/action'
import {bindActionCreators} from 'redux'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class NavLeft extends Component {

    clickMenuItem = ({item, key, keyPath}) => {
       const text=item.props.children.props.children
        this.props.action.changeMenuItem(text)

    }
    render(){
        return(
            <div>
                <div className="nav-left">
                  <Menu mode='vertical' theme='dark' onClick={this.clickMenuItem}>
                      <SubMenu title='首页'>
                          <MenuItem key='/首页'>
                              <Link to='/admin/home'>首页</Link>
                          </MenuItem>
                      </SubMenu>
                      <SubMenu title='订单管理'>
                          <MenuItem key='/订单管理'>
                              <Link to='/admin/order'>订单管理</Link>
                          </MenuItem>
                      </SubMenu>
                      <SubMenu title='图例'>
                          <MenuItem key='/饼状图'>
                              <Link to='/admin/echarts/pie'>饼状图</Link>
                          </MenuItem>
                          <MenuItem key='/柱状图'>
                              <Link to='/admin/echarts/bar'>柱状图</Link>
                          </MenuItem>
                      </SubMenu>


                  </Menu>
                </div>
            </div>
        )
    }
}
export default connect(
    null,
    (dispatch) => ({
        action: bindActionCreators(ActionCreators,dispatch)
    })
)(NavLeft);