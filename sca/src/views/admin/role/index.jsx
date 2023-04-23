import React, { Component } from 'react'
import DynamicFilter from '@/components/Filter'
import { Card, Input, Select } from 'antd'
import DynamicTable from '@/components/DynamicTable'

import {
    roleList, addUserRole
} from '../../../api/role'

const { Option } = Select
class RoleAdmin extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        queryKeys: {
            admin: '',
            rolename: '',
        },
        queryRules: [{
            id: '1',
            name: 'name',
            label: '角色名',
            component: <Input style={{ width: '180px' }} placeholder="请输入角色名称" />,
        },
        {
            id: '2',
            name: 'admin',
            label: '是否为管理员',
            component: <Select style={{ width: '180px' }} placeholder="请选择" >
                <Option value="1">是</Option>
                <Option value="0">否</Option>
            </Select>,

        },],

        listQuery: {
            total: 0,
            current: 1,
            pageSize: 10,
        },
        listRoleQuery: {
            total: 0,
            page: 1,
            limit: 10,
        },

        uiList: [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '角色名',
                dataIndex: 'name',
                key: 'name'
            },

            {
                title: '管理员',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
                render: (row) => {
                    if (row == 1) {
                        return "是"
                    } else {
                        return "否"
                    }
                },
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark'
            },


        ],
        listData: [],
        pageData: [],
    }

    fetchData () {
        console.log("get data")
        let data = this.state.queryKeys
        data.page = this.state.listQuery.current
        data.rows = this.state.listQuery.pageSize
        roleList(data).then((res) => {
            const result = res.data.data
            console.log('res', result)
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            this.setState({
                listData: result,
                listQuery: pageData,
            })
            console.log('state', this.state.listData)
        })
    }

    handleSearch = values => {
        console.log(values)
    }
    componentWillMount () {
        this.fetchData()
    }

    componentDidMount () {
        this.fetchData()
    }

    render () {
        return (
            <div>
                <Card><DynamicFilter formItems={this.state.queryRules} onSearch={this.handleSearch}></DynamicFilter></Card>
                <Card>
                    <DynamicTable uiList={this.state.uiList} data={this.state.listData} pageData={this.state.listQuery} pagination={this.pagination}></DynamicTable>
                </Card>
            </div>
        )
    }
}

export default RoleAdmin