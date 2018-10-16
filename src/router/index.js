import React,{Component} from 'react'
import {HashRouter, Route, Switch } from 'react-router-dom'
import Home from '../views/home'
import SecondPage from '../views/secondPage'
import NotMatch from '../views/notMatch'
import Admin from "../views/admin";
import Order from '../views/order'
import Pie from '../views/echarts/pie'
import Bar from '../views/echarts/bar'
import Details from '../views/order/details'


class Router extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/common/order/detail/:id' component={Details}></Route>
                        <Route path='/' render={() =>
                            <Admin>
                                <Switch>
                                <Route path='/admin/home' component={Home}></Route>
                                    <Route path='/admin/order' component={Order}></Route>
                                    <Route path='/admin/echarts/pie' component={Pie}></Route>
                                    <Route path='/admin/echarts/bar' component={Bar}></Route>

                                    <Route path='/admin/secondPage' component={SecondPage}></Route>
                                <Route  component={NotMatch}></Route>
                                </Switch>
                            </Admin>
                        }></Route>
                        <Route  component={NotMatch}></Route>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}
export default Router;