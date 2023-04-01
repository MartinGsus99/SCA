import React, { Component } from 'react';
import DynamicTable from '@/components/DynamicTable';
import Filter from '@/components/Filter';
import { Card } from 'antd';
import { getCPELoophole } from '@/api/knowledge';



class CWETable extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        queryKeys: {
            type: '1',
            kind: '0',
            cpeId: '',
            dateScope: '',
        },
        listCPEQuery: {
            limit: 10,
            total: 0,
            page: 1,
        },
        data: [],

        queryList: [
            {
              id: 1,
              label: 'CPE编号',
              key: 'cpeId',
              placeholder: 'CPE编号',
              type: 'input',
            },
            {
              id: 2,
              label: '检索类型',
              key: 'type',
              placeholder: '检索类型',
              type: 'select',
              options:[
                {
                    label: '收录时间',
                    value: '1',
      
                  },
                  {
                    label: '更新时间',
                    value: '0',
      
                  },
              ]
            },
       
            {
              id: 3,
              label: '时间范围',
              key: 'timerange',
              placeholder: '请选择时间范围',
              type: 'daterange',
            }
          ],

        cpeUIData: [
            {
                dataIndex: 'cpeId',
                title: 'CPE编号',
            }, {
                dataIndex: 'cpeName',
                title: '攻击向量',
            },
            {
                dataIndex: 'product',
                title: '应用程序',
            },
            {
                dataIndex: 'gmtCreated',
                title: '收录时间',
            },
            {
                dataIndex: 'gmtModified',
                title: '更新时间',
            },
            {
                dataIndex: 'version',
                title: '版本',
            }
        ],
    }

    getCPETableData() {
        let data = this.state.queryKeys;
        data.page = this.state.listCPEQuery.page;
        data.rows = this.state.listCPEQuery.limit;
        console.log(data);
        getCPELoophole(data).then((res) => {
            console.log(res.data);
            this.setState({
                data: res.data.data,
            })
        })
    }


    componentDidMount() {
        this.getCPETableData();
    }

    render() {
        return (
            
             <Card>
                   <Filter formList={this.state.queryList} queryKeys={this.state.queryKeys}></Filter>
                <DynamicTable uiList={this.state.cpeUIData} data={this.state.data} listQuery={this.state.listCPEQuery}></DynamicTable>
          
             </Card>
        );
    }
}

export default CWETable;