import React, { Component } from 'react';
import DynamicTable from '@/components/DynamicTable';
import { getCVELoophole } from '@/api/knowledge';

class CVETable extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        queryKeys: {
            type: '0',
            cveId: '',
            kind: '0',
            start_date: '',
            end_date:'',
        },
        listCVEQuery: {
            current: 1,
            pageSize: 10, // 每页显示的条数
            total: 0, // 数据总数
        },
        data: [],
        uiList: [{
            dataIndex: 'cveId',
            title: 'CVE编号',
        },

        {
            dataIndex: 'gmtPublished',
            title: '收录时间',
        },
        {
            dataIndex: 'gmtModified',
            title: '更新时间',
        },
        {
            dataIndex: 'description',
            title: '描述',
            render: (row) => {
                if (row.length >= 50) {
                    return row.slice(0, 50) + '......';
                }
            }
        },
    ],
    }

    getCVETableData() {
        let data = this.state.queryKeys;
        data.page = this.state.listCVEQuery.current
        data.rows = this.state.listCVEQuery.pageSize
        console.log(data);
        getCVELoophole(data).then((res) => {
            console.log(res.data.data);
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            this.setState({
                data: res.data.data,
                listCVEQuery: pageData,
            })
        })
    }


    componentDidMount() {
        this.getCVETableData();
    }

    render() {
        return (
            <DynamicTable uiList={this.state.uiList} data={this.state.data} pageData={this.state.listCVEQuery}></DynamicTable>
        );
    }
}

export default CVETable;