import React, { Component, useState, useEffect } from 'react'
import DynamicTable from '@/components/DynamicTable'
import DynamicFilter from '@/components/Filter'
import { getCPELoophole } from '@/api/knowledge'
import { Card, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker

const { Option } = Select

function CWETable () {
    const [queryKeys, setQueryKeys] = useState({
        type: '1',
        kind: '0',
        cpeId: '',
        start_date: '',
        end_date: '',
    })

    const [listCPEQuery, setListCPEQuery] = useState({
        current: 1,
        pageSize: 10, // 每页显示的条数
        total: 0, // 数据总数
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (page, pageSize) => {
            let query = JSON.parse(JSON.stringify(listCPEQuery))
            console.log(page)
            listCPEQuery.current = page
            console.log(listCPEQuery)
            setListCPEQuery(query)
            fetchCPETableData(listCPEQuery)
        },
        onShowSizeChange: (page, pageSize) => {
            let query = JSON.parse(JSON.stringify(listCPEQuery))
            listCPEQuery.pageSize = pageSize
            setListCPEQuery(query)
            fetchCPETableData(listCPEQuery)
        },
    })

    const onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1])
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }



    const [queryList, setQueryList] = useState([
        {
            id: 1,
            label: 'CPE编号',
            name: 'cpeId',
            placeholder: 'CPE编号',
            component: <Input style={{ width: '180px' }} placeholder="请输入CPE编号" />,
        },
        {
            id: 2,
            label: '检索类型',
            name: 'type',
            placeholder: '检索类型',
            type: 'select',
            component: <Select style={{ width: '180px' }} placeholder="请选择检索类型" >
                <Option value="1">收录时间</Option>
                <Option value="0">更新时间</Option>
            </Select>,
        },

        {
            id: 3,
            label: '时间范围',
            name: 'timerange',
            placeholder: '请选择时间范围',
            component: <RangePicker
                ranges={{
                    Today: [moment(), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
            />,
        }
    ])

    const [uiList, setuilist] = useState([
        {
            dataIndex: 'cpeId',
            title: 'CPE编号',
            align: 'center',
        }, {
            dataIndex: 'cpeName',
            title: '攻击向量',
            align: 'center',
        },
        {
            dataIndex: 'product',
            title: '应用程序',
            align: 'center',
        },
        {
            dataIndex: 'gmtCreated',
            title: '收录时间',
            align: 'center',
        },
        {
            dataIndex: 'gmtModified',
            title: '更新时间',
            align: 'center',
        },
        {
            dataIndex: 'version',
            title: '版本',
            align: 'center',
        }
    ])

    const getCPETableData = () => {
        let data = queryKeys
        data.page = listCPEQuery.current
        data.rows = listCPEQuery.pageSize
        console.log(data)
        getCPELoophole(data).then((res) => {
            const result = res.data.data
            const pageData = {
                total: res.data.total,
                pageSize: res.data.rows,
                current: res.data.page,
            }
            setData(result.reverse())
            setListCPEQuery(pageData)
        })
    }

    const fetchCPETableData = (listCPEQueryData) => {
        let data = queryKeys
        console.log('listCPEQueryData', listCPEQueryData)
        data.page = listCPEQueryData.current
        data.rows = listCPEQueryData.pageSize
        console.log('data', data)
        getCPELoophole(data).then((res) => {
            const result = res.data.data
            const pageData = {
                total: res.data.total,
                pageSize: res.data.rows,
                current: res.data.page,
            }
            setData(result.reverse())
            setListCPEQuery(pageData)
        })
    }

    const [data, setData] = useState([])

    const handleSearch = values => {
        console.log(values)
        let data = queryKeys
        data.cpeId = values.cpeId || ''
        data.type = values.type || ''
        data.start_date = ''
        data.end_date = ''
        console.log(data)
        getCPELoophole(data).then((res) => {
            const result = res.data.data
            const pageData = {
                total: res.data.total,
                pageSize: res.data.rows,
                current: res.data.page,
            }
            setData(result.reverse())
            setListCPEQuery(pageData)
        })
    }


    useEffect(() => {
        getCPETableData()
    }, [])

    return (
        <div>
            <Card>
                <DynamicFilter formItems={queryList} onSearch={handleSearch}></DynamicFilter>
            </Card>
            <Card>
                <DynamicTable
                    uiList={uiList}
                    data={data}
                    pageData={listCPEQuery}></DynamicTable>
            </Card>

        </div>
    )
}

export default CWETable