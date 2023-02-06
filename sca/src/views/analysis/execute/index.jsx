import React, { useState } from "react";
import Filter from '@/components/Filter';
import DynamicTable from '@/components/DynamicTable';
import { Card, Button } from 'antd';

class ContentAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      uiList:[
        {
          title:'检测名称',
          dataIndex:'name',
        },
        {
          title:'文件名称',
          dataIndex:'filename',
        },
        {
          title:'创建时间',
          dataIndex:'time',
        },
        {
          title:'执行状态',
          dataIndex:'status',
        },
        {
          title:'周期检测',
          dataIndex:'period',
        },
      ],
      data:[
        {
          key:'1',
          name:'Python检测',
          time:'2022-12-03',
          filename:'Python.zip',
          status:'检测完成',
          period:'每月一次'
        }
      ]

    }
  }

  render() {
    return (
      <div>
        <Card>
          <Button>新增任务</Button>
        </Card>
        <Card>
          <DynamicTable uiList={this.state.uiList} data={this.state.data}></DynamicTable>
        </Card>
      </div>
    );
  }
}

export default ContentAnalysis;