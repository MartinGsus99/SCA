import React, { useEffect, useState } from "react"
import DynamicFilter from '@/components/Filter'
import { Card, DatePicker, Input, Select } from 'antd'
import DynamicTable from '@/components/DynamicTable'
import { getTaskReportList } from "../../../api/report"
import moment from 'moment'
const { RangePicker } = DatePicker
const { Option } = Select

function History () {
  const queryList = [
    {
      id: 1,
      label: '报告名称：',
      name: 'reportName',
      component: <Input style={{ width: '180px' }} placeholder="请输入报告名称：" />,
    },
    {
      id: 2,
      label: '检测名称：',
      name: 'name',
      component: <Input style={{ width: '180px' }} placeholder="请输入检测名称：" />,
    },
    {
      id: 3,
      label: '语言类型',
      name: 'language',
      component: <Select style={{ width: '180px' }} placeholder="请选择" >
        <Option value="0">Debian</Option>
        <Option value="1">NodeJS</Option>
        <Option value="2">Python</Option>
        <Option value="3">Java</Option>

      </Select>,
    },
    {
      id: 4,
      name: 'dateRange',
      label: '日期范围',
      component: <RangePicker
        ranges={{
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
        }}
      />,
    }
  ]

  const queryKeys = {
    taskName: '',
    reportName: '',
    language: '0',
    start_date: '',
    end_date: '',
  }

  const uiList = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '报告名称',
      dataIndex: 'reportName',
      key: 'reportName'
    },
    {
      title: '检测名称',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: '项目语言',
      dataIndex: 'language',
      ket: 'language',
      render: (row) => {
        const language = ['Debian', 'NodeJS', 'Python', 'Java']
        return language[row]
      },
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
    },
    {
      title: '执行状态',
      dataIndex: 'status',
      key: 'status',
      render: (row) => {
        if (row == 1) {
          return "检测完成"
        } else {
          return "检查中"
        }
      },
    },
    {
      title: '检测耗时',
      dataIndex: 'cost',
      key: 'cost',
    },
  ]

  const [pageData, setPagedata] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条`,
    onChange: (page, pageSize) => {
      let query = JSON.parse(JSON.stringify(pageData))
      pageData.current = page
      setPagedata(query)
      fetchData()
    },
    onShowSizeChange: (page, pageSize) => {
      let query = JSON.parse(JSON.stringify(pageData))
      pageData.pageSize = pageSize
      setPagedata(query)
      fetchData()
    },
  })

  const [listData, setListData] = useState([])

  const fetchData = () => {
    let data = {}
    data.page = pageData.current
    data.rows = pageData.pageSize
    data.taskName = ''
    data.reportName = ''
    data.language = ''
    data.start_date = ''
    data.end_date = ''
    console.log('data', data)
    getTaskReportList(data).then((res) => {
      const result = res.data.data
      const pageData = {
        total: res.data.total,
        pageSize: res.data.rows,
        current: res.data.page,
      }
      setListData(result)
      setPagedata(pageData)
    })
  }


  const handleSearch = values => {
    console.log('values', values)
    let data = {}
    data.page = pageData.current
    data.rows = pageData.pageSize
    data.taskName = values.taskName || ''
    data.reportName = values.reportName || ''
    data.language = values.language || ''
    data.start_date = ''
    data.end_date = ''
    console.log('data', data)
    getTaskReportList(data).then((res) => {
      const result = res.data.data
      const pageData = {
        total: res.data.total,
        pageSize: res.data.rows,
        current: res.data.page,
      }
      setListData(result)
      setPagedata(pageData)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Card>
        <DynamicFilter formItems={queryList} onSearch={handleSearch}></DynamicFilter>
      </Card>
      <Card>
        <DynamicTable uiList={uiList} data={listData} pageData={pageData}></DynamicTable>
      </Card>
    </div>
  )

}
export default History
