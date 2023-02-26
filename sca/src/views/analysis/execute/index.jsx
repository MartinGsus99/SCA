import React, { useState } from "react";
import Filter from '@/components/Filter';
import DynamicTable from '@/components/DynamicTable';
import DynamicForm from "@/components/DynamicForm";
import { Card, Button, Modal } from 'antd';
import { func } from "prop-types";

class ContentAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      queryKeys: [
        {
          id: 1,
          label: '名称',
          key: 'name',
          placeholder: '请输入名称',
        },
        {
          id: 2,
          label: '时间',
          key: 'time',
          placeholder: '请输入时间'
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
          required: true,
          label: '请输入任务名称:'
        },
        {
          key: 'language',
          type: 'select',
          required: true,
          label: '请选择项目语言：',
          options: [
            {
              label: 'A',
              value: 'a',
            }, {
              label: 'A',
              value: 'a',
            }
          ]
        }
      ],
    }
  }

  render() {
    var showModal = () => {
      console.log("1")
      this.setState({
        visible: true,
      });
    };

    var handleOk = e => {
      console.log(e);
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
          <DynamicForm formItems={this.state.formItems}></DynamicForm>
        </Modal>


      </div>
    );
  }
}

export default ContentAnalysis;