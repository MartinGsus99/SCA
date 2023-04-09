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
            current: 1,
            pageSize: 10, // 每页显示的条数
            total: 0, // 数据总数
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
        data.page = this.state.listCWEQuery.current
        data.rows = this.state.listCWEQuery.pageSize
        getCWELoophole(data).then((res) => {
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            this.setState({
                data: res.data.data,
                listCWEQuery: pageData,
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
                <DynamicTable uiList={this.state.cweUIData} data={this.state.data} pageData={this.state.listCWEQuery}></DynamicTable>
            </Card>
        );
    }
}

export default CWETable;