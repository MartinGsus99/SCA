import React, { Component } from 'react';
import DynamicFilter from '@/components/Filter';
import { Card } from 'antd';
import DynamicTable from '@/components/DynamicTable';

import {
    getLogData
} from '../../../api/log';

class Log extends Component {
    state = { 
          queryKeys: {
            dateRange: '',
        },
        queryRules: [{
            id: '1',
            key: 'dateRange',
            label: '日期范围',
            type: 'daterange',
            placeholder: '请输入角色名',
        },
       ],

        listQuery: {
            current: 1,
            pageSize: 10, // 每页显示的条数
            total: 0, // 数据总数
        },
    
        uiList: [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'IP',
                dataIndex: 'requestAddr',
                key: 'requestAddr'
            },

            {
                title: '时间',
                dataIndex: 'gmtCreate',
                key: 'gmtCreate',
            },
            {
                title: '模块',
                dataIndex: 'modelName',
                key: 'modelName'
            },
            {
                title: 'URL',
                dataIndex: 'requestUrl',
                key: 'requestUrl'
            },
            
        ],
        listData:[],
        pageData:[],
     } 


     fetchData() {
        console.log("get data")
        let data = this.state.queryKeys
        data.page = this.state.listQuery.current
        data.rows = this.state.listQuery.pageSize
        getLogData(data).then((res) => {
            const result = res.data.data;
            console.log('res', result)
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            this.setState({
                listData: result,
                listQuery: pageData,
            })
            console.log('state', this.state.listData);
        })
    }

    componentWillMount() {
        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    render() { 
        return (
           <div>
                <Card><DynamicFilter formList={this.state.queryRules} queryKeys={this.state.queryKeys} searchInfor={this.printData}></DynamicFilter></Card>
                <Card>
                    <DynamicTable uiList={this.state.uiList} data={this.state.listData} pageData={this.state.listQuery} pagination={this.pagination}></DynamicTable>
                </Card>
            </div>
        );
    }
}
 
export default Log;