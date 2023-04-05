import React, { Component } from 'react';
import DynamicFilter from '@/components/Filter';
import { Card } from 'antd';
import DynamicTable from '@/components/DynamicTable';

import {
    getUserList, userDel, userAdd, userEdit, resetPassword
} from '../../../api/user';
import {
    roleList, addUserRole
} from '../../../api/user';
class UserAdmin extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        queryKeys: {
            name: '',
            username: '',
        },
        queryRules: [{
            id: '1',
            key: 'name',
            label: '用户名：',
            type: 'input',
            placeholder: '请输入用户名',
        },
        {
            id: '2',
            key: 'username',
            label: '账号：',
            type: 'input',
            placeholder: '请输入账号',
        },

        ],
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
        listData: [],
        uiData: [
            {
                key: 'id',
                dataIndex: 'id',
                title: 'ID'
            },
            {
                key: 'name',
                dataIndex: 'name',
                title: '用户名'
            },
            {
                key: 'username',
                dataIndex: 'username',
                title: '账号'
            },
            {
                key: 'roleNameStr',
                dataIndex: 'roleNameStr',
                title: '角色'
            }
        ],
    }

    fetchData() {
        console.log("get data")
        let data = this.state.queryKeys
        data.page = this.state.listQuery.current
        data.rows = this.state.listQuery.pageSize
        getUserList(data).then((res) => {
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
            console.log('state', this.state.data);
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
                    <DynamicTable uiList={this.state.uiData} data={this.state.listData} pageData={this.state.listQuery} pagination={this.pagination}></DynamicTable>
                </Card>
            </div>
        );
    }
}

export default UserAdmin;