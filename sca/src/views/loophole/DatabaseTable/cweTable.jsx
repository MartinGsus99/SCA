import React, { Component } from 'react';
import DynamicTable from '@/components/DynamicTable';
import Filter from '@/components/Filter';
import { Card } from 'antd';
import { getCWELoophole } from '@/api/knowledge';


class CWETable extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        queryKeys: {
            type: '2',
            cweName: '',
        },
        listCWEQuery: {
            limit: 10,
            total: 0,
            page: 1,
        },
        data: [],

        queryList: [
            {
                id: 1,
                label: 'CWE名称',
                key: 'cweId',
                placeholder: 'CWE名称',
                type: 'input',
            },
        ],

        cweUIData: [
            {
                title: '序号',
                dataIndex: 'id',
            },
            {
                title: 'CWE名称',
                dataIndex: 'name',
            }, {
                title: 'CWE编号',
                dataIndex: 'cweId',
                render: (row) => {
                    return 'CWE-' + row;
                }
            },
            {
                title: '描述',
                dataIndex: 'description',
                render: (row) => {
                    if (row.length >= 50) {
                        return row.slice(0, 50) + '......';
                    }
                }
            },
        ],
    }

    getCWETableData() {
        let data = this.state.queryKeys;
        data.page = this.state.listCWEQuery.page
        data.rows = this.state.listCWEQuery.limit
        getCWELoophole(data).then((res) => {
            this.setState({
                data: res.data.data,
            })
        })
    }

    

    componentDidMount() {
        this.getCWETableData();
    }

    render() {
        return (
            <Card>
                <Filter formList={this.state.queryList} queryKeys={this.state.queryKeys}></Filter>
                <DynamicTable uiList={this.state.cweUIData} data={this.state.data} listQuery={this.state.listQuery}></DynamicTable>
            </Card>
        );
    }
}

export default CWETable;