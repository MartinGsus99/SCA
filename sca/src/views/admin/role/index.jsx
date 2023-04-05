import React, { Component } from 'react';
import DynamicFilter from '@/components/Filter';
import { Card } from 'antd';
import DynamicTable from '@/components/DynamicTable';

import {
    roleList, addUserRole
} from '../../../api/role';
class RoleAdmin extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        queryKeys: {
            admin: '',
            rolename: '',
        },
        queryRules: [{
            id: '1',
            key: 'name',
            label: '角色名',
            type: 'input',
            placeholder: '请输入角色名',
        },
        {
            id: '2',
            key: 'admin',
            label: '是否为管理员',
            type: 'select',
            placeholder: '请选择',
            options: [
                {
                    label: '是',
                    value: '1',

                }, {
                    label: '否',
                    value: '0',

                }
            ]
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
                      return "是";
                    } else {
                      return "否";
                    }
                  },
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark'
            },
            
        ],
        listData:[],
        pageData:[],
    }

    fetchData() {
        console.log("get data")
        let data = this.state.queryKeys
        data.page = this.state.listQuery.current
        data.rows = this.state.listQuery.pageSize
        roleList(data).then((res) => {
            const result = res.data.data;
            console.log('res', result)
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            this.setState({
                listData: result,
                listQuery: pageData,
            })
            console.log('state', this.state.listData);
        })
    }

    componentWillMount() {
        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <Card><DynamicFilter formList={this.state.queryRules} queryKeys={this.state.queryKeys} searchInfor={this.printData}></DynamicFilter></Card>
                <Card>
                    <DynamicTable uiList={this.state.uiList} data={this.state.listData} pageData={this.state.listQuery} pagination={this.pagination}></DynamicTable>
                </Card>
            </div>
        );
    }
}

export default RoleAdmin;