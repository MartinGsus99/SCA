import React, { useEffect } from 'react'
import { useState } from 'react'
import DynamicFilter from '@/components/Filter'
import { Card, Divider, Modal, Button } from 'antd'
import DynamicTable from '@/components/DynamicTable'

import {
    getUserList, userDel, userAdd, userEdit, resetPassword
} from '../../../api/user'
import {
    roleList, addUserRole
} from '../../../api/user'



function UserAdmin () {

    const [modalFlag, setModalFlag] = useState(false)

    const showModal = () => {
        setModalFlag(true)
    }

    const hideModal = () => {
        setModalFlag(false)
    }

    const deleteUser = () => {
        setModalFlag(true)
    }

    const editUser = () => {

    }

    const [listData, setListData] = useState([])

    const [listQuery, setListQuery] = useState({
        page: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (page, pageSize) => {
            let query = JSON.parse(JSON.stringify(listQuery))
            listQuery.page = page
            setListQuery(query)
            fetchData(listQuery)
        },
        onShowSizeChange: (page, pageSize) => {
            let query = JSON.parse(JSON.stringify(listQuery))
            listQuery.pageSize = pageSize
            setListQuery(query)
            fetchData(listQuery)
        },
    })


    const [listRoleQuery, setListRoleQuery] = useState({
        total: 0,
        page: 1,
        limit: 10,
    })

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
                    <a onClick={editUser}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={deleteUser}>删除</a>
                    <Divider type="vertical" />
                    <a onClick={resetPassword}>重置密码</a>
                </span>
            ),
        },
    ])

    const [queryKeys, setQueryKeys] = useState({
        name: '',
        username: '',
    })

    const [queryRules, setQueryRules] = useState([
        {
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
        }
    ])





    const fetchData = (listCVEQueryData) => {
        let data = queryKeys
        data.page = listCVEQueryData.current
        data.rows = listCVEQueryData.pageSize
        getUserList(data).then((res) => {
            const result = res.data.data
            console.log("get data", result)
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            setListData(result.reverse())
            setListQuery(pageData)
        })
    }

    const getData = () => {
        let data = queryKeys
        data.page = listQuery.current
        data.rows = listQuery.pageSize
        getUserList(data).then((res) => {
            const result = res.data.data
            const pageData = {
                total: res.data.total,
                pageSize: res.data.rows,
                current: res.data.page
            }
            setListData(result)
            setListQuery(pageData)
        })
    }



    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Card><DynamicFilter queryKeys={queryKeys} formList={queryRules}></DynamicFilter></Card>
            <Card>
                <DynamicTable uiList={uiList} data={listData} pageData={listQuery} ></DynamicTable>
            </Card>
            <Modal
                title="Modal"
                visible={modalFlag}
                onOk={hideModal}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
            >
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
            </Modal>
        </div>
    )

}

export default UserAdmin