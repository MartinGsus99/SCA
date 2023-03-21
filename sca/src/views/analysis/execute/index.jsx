import React, { useState } from "react";
import DynamicTable from '@/components/DynamicTable';
import DynamicForm from "@/components/DynamicForm";
import { Card, Button, Modal } from 'antd';


class ContentAnalysis extends React.Component {
  constructor(props) {
    super(props);
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
          dataIndex: 'name',
        },
        {
          title: '文件名称',
          dataIndex: 'filename',
        },
        {
          title: '创建时间',
          dataIndex: 'time',
        },
        {
          title: '执行状态',
          dataIndex: 'status',
        },
        {
          title: '周期检测',
          dataIndex: 'period',
        },
      ],
      data: [
        {
          key: '1',
          name: 'Python检测',
          time: '2022-12-03',
          filename: 'Python.zip',
          status: '检测完成',
          period: '每月一次'
        }
      ],
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
          placeholder:'请输入检测名称'
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
      taskform:{
        taskname:'',
        language:'',
      }
    }
  }

  render() {
    var showModal = () => {
      this.setState({
        visible: true,
      });
    };

    var handleOk = e => {
      console.log(this.state.taskform);

      this.setState({
        visible: false,
      });
    };

    var handleCancel = e => {
      this.setState({
        visible: false,
      });
    };
    return (
      <div>
        <Card>
          <Button onClick={showModal}>新增任务</Button>
        </Card>
        <Card>
          <DynamicTable uiList={this.state.uiList} data={this.state.data}></DynamicTable>
        </Card>
        <Modal title="Test Modal" visible={this.state.visible}
          onOk={handleOk
          } onCancel={handleCancel}>
          <DynamicForm formItems={this.state.formItems} form={this.state.taskform}></DynamicForm>
        </Modal>


      </div>
    );
  }
}

export default ContentAnalysis;