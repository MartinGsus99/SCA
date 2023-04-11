import React, { Component } from 'react';
import { useState } from 'react';
import DynamicFilter from '@/components/Filter';
import { Card, Divider } from 'antd';
import DynamicTable from '@/components/DynamicTable';

import {
    getUserList, userDel, userAdd, userEdit, resetPassword
} from '../../../api/user';
import {
    roleList, addUserRole
} from '../../../api/user';



function UserAdmin() {
    const [count, setCount] = useState(100);
    const changeData = () => {
        setCount(count + 1);
    }

    const [uiList, setUiList] = useState([
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
            title: '角色',
            tags: 'primary',
        },
        {
            key: 'action',
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={changeData}>编辑</a>
                    <Divider type="vertical" />
                    <a>删除</a>
                    <Divider type="vertical" />
                    <a>重置密码</a>
                </span>
            ),
        },
    ]);

    const [queryKeys,setQueryKeys]=useState({
        name:'',
        username:'',
    });

    const [queryRules, setQueryRules] = useState([{
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
    },]);

    const [listQuery, setListQuery] = useState({
        total: 0,
        current: 1,
        pageSize: 10,
    })


    const [listRoleQuery,setListRoleQuery]=useState({
        total: 0,
        page: 1,
        limit: 10,
    })

    const fetchData = () => {
        let data = queryKeys
        data.page = listQuery.current
        data.rows = listQuery.pageSize
        getUserList(data).then((res) => {
            const result = res.data.data;
            console.log("get data",result);
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            return result;
        })
    };

    const [listData,setListData]=useState(fetchData());

    

    return (
        <div>
            {/* <Card><DynamicFilter queryKeys={queryKeys} queryRules={queryRules}></DynamicFilter></Card> */}
            <Card>
                <DynamicTable count={count} uiList={uiList} data={listData} pageData={listQuery} ></DynamicTable>
            </Card>
        </div>
    )

}

export default UserAdmin;