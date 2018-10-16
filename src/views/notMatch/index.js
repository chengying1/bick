import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import noMatchImg from './img.gif'
import './index.less'
class NotMatch extends Component {

    render(){
        return(
            <div className='notmatch clearfix'>
                <div className="notmatch-left fll">
                    <div className="title">
                        oh my God!
                    </div>
                    <div className="desc">
                        404没有找到你要的页面
                    </div>
                    <ul>
                        <li>你可以去</li>
                        <li><Link to='/admin/home'>会首页</Link>

                        </li>
                    </ul>
                </div>
                <div className="img-wrap">
                    <img src={noMatchImg} alt=""/>
                </div>

            </div>
        )
    }
}
export default NotMatch;