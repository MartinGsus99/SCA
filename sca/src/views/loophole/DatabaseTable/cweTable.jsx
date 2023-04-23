import React, { Component, useEffect, useState } from 'react'
import DynamicTable from '@/components/DynamicTable'
import DynamicFilter from '@/components/Filter'
import { Card, Input, message } from 'antd'
import { getCWELoophole } from '@/api/knowledge'

function CWETable () {
    const [queryKeys, setQueryKeys] = useState({
        type: '2',
        cweName: '',
    })

    const [listCWEQuery, setListCWEQuery] = useState({
        current: 1,
        pageSize: 10, // 每页显示的条数
        total: 0, // 数据总数
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (page, pageSize) => {
            let query = JSON.parse(JSON.stringify(listCWEQuery))
            listCWEQuery.current = page
            setListCWEQuery(query)
            fetchCWETableData(listCWEQuery)
        },
        onShowSizeChange: (page, pageSize) => {
            let query = JSON.parse(JSON.stringify(listCWEQuery))
            listCWEQuery.pageSize = pageSize
            setListCWEQuery(query)
            fetchCWETableData(listCWEQuery)
        },
    })


    const onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1])
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }


    const [queryList, setQueryList] = useState([
        {
            id: 1,
            label: 'CWE名称',
            name: 'cweName',
            component: <Input style={{ width: '180px' }} placeholder="请输入CWE名称" />,
        },
    ])



    const [uiList, setuilist] = useState([
        {
            title: '序号',
            align: 'center',
            dataIndex: 'id',
        },
        {
            title: 'CWE编号',
            align: 'center',
            dataIndex: 'cweId',
            render: (row) => {
                return 'CWE-' + row
            }
        },
        {
            title: 'CWE名称',
            align: 'center',
            dataIndex: 'name',
        },

        {
            title: '描述',
            align: 'center',
            dataIndex: 'description',
            render: (row) => {
                if (row.length >= 50) {
                    return row.slice(0, 50) + '......'
                }
            }
        },

    ])

    const [cweData, setCweData] = useState([])
    const getCWETableData = () => {
        let data = queryKeys
        data.page = listCWEQuery.current
        data.rows = listCWEQuery.pageSize

        getCWELoophole(data).then((res) => {
            if (res.data.success) {
                message.success("获取数据成功！")
                const result = res.data.data
                const pageData = {
                    total: res.data.total,
                    pageSize: res.data.rows,
                    current: res.data.page,
                }
                setCweData(result)
                setListCWEQuery(pageData)
            } else {
                message.error(res.data)
            }
        })
    }

    const fetchCWETableData = (listCWEQueryData) => {
        let data = queryKeys
        data.page = listCWEQueryData.current
        data.rows = listCWEQueryData.pageSize
        getCWELoophole(data).then((res) => {
            if (res.data.success) {
                const result = res.data.data
                const pageData = {
                    total: res.data.total,
                    pageSize: res.data.rows,
                    current: res.data.page,
                }
                setCweData(result)
                setListCWEQuery(pageData)
            } else {
                message.error(res.data)
            }
        })
    }

    const handleSearch = values => {
        let data = queryKeys
        data.cweName = values.cweName
        data.page = listCWEQuery.current
        data.rows = listCWEQuery.pageSize
        data.type = 2
        getCWELoophole(data).then((res) => {
            if (res.data.success) {
                message.success("查询成功！")
                const result = res.data.data
                const pageData = {
                    total: res.data.total,
                    pageSize: res.data.rows,
                    current: res.data.page,
                }
                setCweData(result)
                setListCWEQuery(pageData)
            } else {
                message.error(res.data)
            }
        })
    }



    useEffect(() => {
        getCWETableData()
    }, [])

    return (
        <div>
            <Card>
                <DynamicFilter formItems={queryList} onSearch={handleSearch}></DynamicFilter>
            </Card>
            <Card>
                <DynamicTable
                    uiList={uiList}
                    data={cweData}
                    pageData={listCWEQuery}></DynamicTable>
            </Card>
        </div>
    )
}

export default CWETable