import React from "react";
import Filter from '@/components/Filter';
import { Card } from 'antd';
import DynamicTable from '@/components/DynamicTable';
import { getTaskReportList } from "../../../api/report";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryRules: [
        {
          id: 1,
          label: '报告名称：',
          key: 'reportName',
          placeholder: '报告名称',
          type: 'string',
        },
        {
          id: 2,
          label: '检测名称：',
          key: 'name',
          placeholder: '检测名称',
          type: 'string',
        },
        {
          id: 3,
          label: '语言类型',
          key: 'language',
          placeholder: '语言类型',
          type: 'select',
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
          id: 4,
          label: '时间范围',
          key: 'timerange',
          placeholder: '请选择时间范围',
          type: 'daterange',
        }
      ],
      uiList: [
        {
          title: '序号',
          dataIndex: 'id',
        },
        {
          title: '检测名称',
          dataIndex: 'taskName',
        },
        {
          title: '文件名称',
          dataIndex: 'reportName',
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
        },
        {
          title: '执行状态',
          dataIndex: 'status',
          render: () => {
            console.log();
          },
        },
        {
          title: '检测耗时',
          dataIndex: 'cost',
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
        page: 1,
        limit: 10,
      },
      data: [],

    };

  }

  componentWillMount() {
    this.fetchData();
  }

  componentDidMount() {

  }

  fetchData() {
    let data = this.state.queryReportKeys;
    data.page = this.state.listQuery.page;
    data.rows = this.state.listQuery.limit;

    getTaskReportList(data).then((res) => {
      const result = res.data.data;
      this.setState({
        data: result,
      })
    })
  }

  render() {
    return (
      <div>
        <Card> <Filter queryRules={this.state.queryRules}  queryKeys={this.state.queryReportKeys} searchInfor={this.fetchData}></Filter></Card>
        <Card>
          <DynamicTable uiList={this.state.uiList} data={this.state.data} listQuery={this.state.listQuery}></DynamicTable>
        </Card>
      </div>
    );
  }
}

export default History;