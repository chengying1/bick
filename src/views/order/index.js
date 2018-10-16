import React,{Component} from 'react'
import './index.less'
import {Form, Select, Card, DatePicker, Button, Table, message,Modal} from 'antd'
import axios from '../../axios'

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker

class Order extends Component {

    state = {
        dataSource:[],
        pageSize:'',
        total:'',
        isLoading:false,
        endItem:{},
    }

    params = {
        pn:1
    }
    componentWillMount () {
        this.getTable()
    }
    getTable = () => {
        this.setState({
            isLoading:true
        })
        axios.get('/order/list',this.params).then(res => {
            if(res.code == 0){
                this.setState({
                    dataSource: res.result.item_list.map((item, index) => {
                        item.key = index
                        return item
                    }),
                    total:res.result.total_count,
                    isLoading:false
                })
            }
        })
    }
    handleSearch = () => {
        // console.log(this.props.form.getFieldsValue())
    }
    resetData = () => {
        this.props.form.resetFields()
    }
    handleDone = () => {
        let selectedItem = this.state.selectedItem
        if(selectedItem){
            axios.get('/order/ebike_info',{params: {id: selectedItem[0].id}}).then(res => {
                // console.log(res)
                this.setState({
                    endItem:res.result,
                    isShowModal:true
                })
            })
        }else {
            message.info('请选择一项订单进行操作')
        }
    }
    handleEnd = () => {
        let id = this.state.selectedItem[0].id
        this.setState({
            isShowModal:false
        })
        axios.get('/order/finish_order', {id}).then(res => {
            if(res.code == 0){
                message.success('结束订单成功')
                this.getTable()
            }
        })
    }
    handleDetail = () => {
        let item = this.state.selectedItem
        if(item) {
            window.open(`/#/common/order/detail/${item[0].id}`, '_blank')
        }else {
            message.info('请选择一项订单进行操作')
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        const cityOption = [
            {
                label:'上海',
                value:'0'
            },
            {
                label:'北京',
                value:'1'
            },
            {
                label:'广州',
                value:'2'
            },
        ]
        const orderstatus = [
            {
                label:'进行中',
                value:'0'
            },
            {
                label:'已完成',
                value:'1'
            },
            {
                label:'结束行程',
                value:'2'
            },
        ]
        const Columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                },
                key: 'distance'
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
            }
        ]

        // const _this = this
        const pagination = {
            total:this.state.total,
            pageSize:10,
            onChange:(index) => {
                this.params.pn = index
                this.getTable()
            }
        }
        const rowSelection = {
            type : "radio",
            selectedRowKeys: this.state.selectedIndex,
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(selectedRowKeys, selectedRows)
                this.setState({
                    selectedItem:  selectedRows,
                    selectedIndex: selectedRowKeys
                })
            }
        }

        return(
            <div className='Order'>
              <Card>
                  <Form layout='inline'>
                      <FormItem label='选择城市'>
                          {
                              getFieldDecorator('city',{initialValue:"1"})
                              (<Select style={{width:150}}>
                                  {cityOption.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
                              </Select>)
                          }

                      </FormItem>
                      <FormItem label='订单时间'>
                          {
                              getFieldDecorator('date')
                              (<RangePicker></RangePicker>)
                          }

                      </FormItem>
                      <FormItem label='订单状态'>
                          {
                              getFieldDecorator('order_status')
                              (<Select style={{width:220}}>
                                  {orderstatus.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
                              </Select>)
                          }

                      </FormItem>
                  </Form>
                  <div className="btn-wrap">
                      <Button type='primary' onClick={this.handleSearch}>查询</Button>
                      <Button type='warning' onClick={this.resetData}>重置</Button>

                  </div>
              </Card>
                <Card style={{marginTop:-1}}>
                    <Button type='primary' className='mgr-20' onClick={this.handleDetail}>订单详情</Button>
                    <Button onClick={this.handleDone}>结束订单</Button>
                </Card>
                <Card>
                    <Table
                        columns={Columns}
                        loading={this.state.isLoading}
                        pagination={pagination}
                        dataSource={this.state.dataSource}
                        rowSelection={rowSelection}
                    ></Table>
                </Card>
                <Modal
                    title="结束订单"
                    visible={this.state.isShowModal}
                    onOk={this.handleEnd}
                    onCancel={() => this.setState({isShowModal: false})}
                >
                    <ul className='ul-data'>
                        <li>
                            <span className='car-num li-title'>车辆编号：</span>
                            {this.state.endItem.bike_sn}
                        </li>
                        <li>
                            <span className='car-num li-title'>剩余电量：</span>
                            {this.state.endItem.battery}
                        </li>
                        <li>
                            <span className='car-num li-title'>行程开始时间：</span>
                            {this.state.endItem.start_time}
                        </li>
                        <li>
                            <span className='car-num li-title'>当前位置：</span>
                            {this.state.endItem.location}
                        </li>

                    </ul>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(Order);