import React from "react";
import DynamicFilter from '@/components/Filter';
import { Card } from 'antd';
import DynamicTable from '@/components/DynamicTable';
import { getTaskReportList } from "../../../api/report";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: [
        {
          id: 1,
          label: '报告名称：',
          key: 'reportName',
          placeholder: '报告名称',
          type: 'input',
        },
        {
          id: 2,
          label: '检测名称：',
          key: 'name',
          placeholder: '检测名称',
          type: 'input',
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
          key:'id'
        },
        {
          title: '检测名称',
          dataIndex: 'taskName',
          key:'taskName',
        },
        {
          title: '文件名称',
          dataIndex: 'reportName',
          key:'reportName'
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          key:'gmtCreate',
        },
        {
          title: '执行状态',
          dataIndex: 'status',
          key:'status',
          render: (row) => {
            if (row == 1) {
              return "检测完成";
            } else {
              return "检查中";
            }
          },
        },
        {
          title: '检测耗时',
          dataIndex: 'cost',
          key:'cost',
        },
      ],

      queryReportKeys: {
        reportName: "",
        taskName: "",
        language: "",
        dateScope: "",
      },
      listQuery: {
        current:10,
        pageSize: 10, // 每页显示的条数
        total: 0, // 数据总数
      },
      data: [],

    }
  }

  fetchData() {
    let data = this.state.queryReportKeys;
    data.page = this.state.listQuery.current;
    data.rows = this.state.listQuery.pageSize;
    getTaskReportList(data).then((res) => {
      const result = res.data.data;
      //console.log('res',result)
      const pageData={
        total:res.data.total,
        pageSize:res.data.page,
      }
      this.setState({
        data: result,
        listQuery:pageData,
      })
      console.log('state',this.state.data);
    })
  }

  pagination(current,pageSize){
      console.log("分页");
      let data={};
      data.page = current;
      data.rows = pageSize;
      let datas=[]
      getTaskReportList(data).then((res) => {
        datas = res.data.data;
        console.log(datas);
      })
  }

  componentDidMount(){
    this.fetchData();
  }

  render() {
    return (
      <div>
        <Card><DynamicFilter formList={this.state.formList} queryKeys={this.state.queryReportKeys} searchInfor={this.printData}></DynamicFilter></Card>
        <Card>
          <DynamicTable uiList={this.state.uiList} data={this.state.data} pageData={this.state.listQuery} pagination={this.pagination}></DynamicTable>
        </Card>
      </div>
    );
  }
}

export default History;