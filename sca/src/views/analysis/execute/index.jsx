import React, { useState } from "react"
import DynamicTable from '@/components/DynamicTable'
import DynamicForm from "@/components/DynamicForm"
import { Card, Button, Modal } from 'antd'
import { getTask } from "../../../api/task"


class ContentAnalysis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      queryKeys: [
        {
          id: 1,
          label: '报告名称：',
          key: 'name',
          placeholder: '报告名称',
        },
        {
          id: 2,
          label: '检测名称：',
          key: 'time',
          placeholder: '检测名称'
        },
        {
          id: 3,
          label: '语言类型',
          key: 'language',
          placeholder: '语言类型',
        },
        {
          id: 4,
          label: '时间范围',
          key: 'time',
          placeholder: '请选择时间范围'
        }

      ],
      uiList: [
        {
          title: '检测名称',
          dataIndex: 'taskName',
        },
        {
          title: '文件名称',
          dataIndex: 'fileName',
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
        },
        {
          title: '执行状态',
          dataIndex: 'status',
        },
        {
          title: '周期检测',
          dataIndex: 'cronTab',
        },
      ],

      queryReportKeys: {
        reportName: "",
        taskName: "",
        language: "",
        dateScope: "",
      },
      listQuery: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      data: [],
      formItems: [
        {
          key: 'taskname',
          type: 'string',
          rules: [
            {
              required: true
            }
          ],
          label: '检测名称:',
          placeholder: '请输入检测名称'
        },

        {
          key: 'language',
          type: 'select',
          rules: [
            {
              required: true
            }
          ],
          label: '项目语言:',
          placeholder: '请选择项目语言：',
          options: [
            {
              label: 'NodeJS',
              value: 'nodejs',

            }, {
              label: 'Java',
              value: 'java',

            }
          ]
        },
        {
          key: 'period',
          type: 'cron',
          rules: [
            {
              required: true
            }
          ],
          label: '任务周期:',
          placeholder: '请选择任务周期'
        },
        {
          key: 'file',
          type: 'upload',
          rules: [
            {
              required: true
            }
          ],
          label: '项目文件:',
          placeholder: '项目文件'
        },
        {
          key: 'remark',
          type: 'string',
          rules: [
            {
              required: false
            }
          ],
          label: '备注:',
          placeholder: '请输入备注'
        },
      ],
      taskform: {
        taskname: '',
        language: '',
      },
      isLoading: false,
    }
  }

  fetchData () {
    let data = this.state.queryReportKeys
    data.page = this.state.listQuery.current
    data.rows = this.state.listQuery.pageSize
    getTask(data).then((res) => {
      const result = res.data.data
      const pageData = {
        total: res.data.total,
        pageSize: res.data.page,
      }
      this.setState({
        data: result,
        listQuery: pageData
      })
    })
  }

  componentWillMount () {
    this.fetchData()
  }


  render () {
    var showModal = () => {
      this.setState({
        visible: true,
      })
    }

    var handleOk = e => {
      console.log(this.state.taskform)

      this.setState({
        visible: false,
      })
    }

    var handleCancel = e => {
      this.setState({
        visible: false,
      })
    }
    return (
      <div>
        <Card>
          <Button onClick={showModal}>新增任务</Button>
        </Card>
        <Card>
          <DynamicTable uiList={this.state.uiList} data={this.state.data} pageData={this.state.listQuery} isLoading={this.state.isLoading}></DynamicTable>
        </Card>
        <Modal title="Test Modal" visible={this.state.visible}
          onOk={handleOk
          } onCancel={handleCancel}>
          <DynamicForm formItems={this.state.formItems} form={this.state.taskform}></DynamicForm>
        </Modal>


      </div>
    )
  }
}

export default ContentAnalysis