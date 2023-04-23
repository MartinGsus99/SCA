import React, { useEffect } from 'react'
import DynamicTable from '@/components/DynamicTable'
import DynamicFilter from '@/components/Filter'
import KnowledgeMap from '@/components/KnowledgeMap'
import { getCVELoophole } from '@/api/knowledge'
import { useState } from 'react'
import { Card, Modal, Input, Select, DatePicker, message } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker

const { Option } = Select
function CVETable () {
  const [queryKeys, setQueryKeys] = useState({
    type: '0',
    cveId: '',
    kind: '0',
    start_date: '',
    end_date: '',
  })

  const [listCVEQuery, setListCVEQuery] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条`,
    onChange: (page, pageSize) => {
      let query = JSON.parse(JSON.stringify(listCVEQuery))
      listCVEQuery.page = page
      setListCVEQuery(query)
      fetchCVETableData(listCVEQuery)
    },
    onShowSizeChange: (page, pageSize) => {
      let query = JSON.parse(JSON.stringify(listCVEQuery))
      listCVEQuery.pageSize = pageSize
      setListCVEQuery(query)
      fetchCVETableData(listCVEQuery)
    },
  })


  const onChange = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1])
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
  }


  const [queryList, setQueryList] = useState([
    {
      id: 1,
      label: 'CVE编号',
      name: 'cveId',
      placeholder: 'CVE编号',
      component: <Input style={{ width: '180px' }} placeholder="请输入CVE编号" />,
    },
    {
      id: 2,
      label: '检索类型',
      name: 'type',
      placeholder: '检索类型',
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
        onChange={onChange}
      />,
    },
  ])

  const [uiList, setuilist] = useState([
    {
      dataIndex: 'cveId',
      title: 'CVE编号',
      align: 'center',
    },

    {
      dataIndex: 'gmtPublished',
      title: '收录时间',
      align: 'center',
    },
    {
      dataIndex: 'gmtModified',
      title: '更新时间',
      align: 'center',
    },
    {
      dataIndex: 'description',
      title: '描述',
      align: 'center',
      render: (row) => {
        if (row.length >= 50) {
          return row.slice(0, 50) + '......'
        }
      },
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      render: (text, record) => (
        <span>
          <a onClick={showModal}>查看知识图谱</a>
        </span>
      ),
    },
  ])

  const [isLoading, setLodingFlag] = useState(false)
  const [cveData, setCveData] = useState([])
  const getCVETableData = () => {
    let data = queryKeys
    data.page = listCVEQuery.page
    data.rows = listCVEQuery.pageSize
    getCVELoophole(data).then((res) => {
      if (res.data.success) {
        setLodingFlag(false)
        message.success("查询成功！")
        const result = res.data.data
        const pageData = {
          total: res.data.total,
          pageSize: res.data.rows,
          current: res.data.page,
        }
        setCveData(result)
        setListCVEQuery(pageData)
      } else {
        setLodingFlag(false)
        message.error(res.data)
      }
    })
  }

  const fetchCVETableData = (listCVEQueryData) => {
    let data = queryKeys
    data.page = listCVEQueryData.page
    data.rows = listCVEQueryData.pageSize
    getCVELoophole(data).then((res) => {
      if (res.data.success) {
        setLodingFlag(false)
        message.success("查询成功！")
        const result = res.data.data
        const pageData = {
          total: res.data.total,
          pageSize: res.data.rows,
          current: res.data.page,
        }
        setCveData(result)
        setListCVEQuery(pageData)
      } else {
        setLodingFlag(false)
        message.error(res.data)
      }
    })
  }

  const handleSearch = values => {
    let data = queryKeys
    data.cweName = values.cweName
    data.page = listCVEQuery.current
    data.rows = listCVEQuery.pageSize
    data.type = values.type
    data.cveId = values.cveId
    getCVELoophole(data).then((res) => {
      if (res.data.success) {
        message.success("查询成功！")
        const result = res.data.data
        const pageData = {
          total: res.data.total,
          pageSize: res.data.rows,
          current: res.data.page,
        }
        setCveData(result)
        setListCVEQuery(pageData)
      } else {
        message.error(res.data)
      }
    })
  }

  const [modalFlag, setModalFlag] = useState(false)
  const modalStyle = {
    width: '1200px',
    height: '800px',
  }

  const showModal = () => {
    setModalFlag(true)
  }

  const hideModal = () => {
    setModalFlag(false)
  }

  useEffect(() => {
    getCVETableData()
  }, [])

  return (
    <div>
      <Card>
        <DynamicFilter formItems={queryList} onSearch={handleSearch}></DynamicFilter>
      </Card>
      <Card>
        <DynamicTable
          isLoading={isLoading}
          uiList={uiList}
          data={cveData}
          pageData={listCVEQuery}></DynamicTable>
      </Card>

      <Modal width={1200}
        bodyStyle={modalStyle}
        title="Modal"
        visible={true}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <KnowledgeMap ></KnowledgeMap>
      </Modal>
    </div >
  )
}

export default CVETable
