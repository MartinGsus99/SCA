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
            dateScope: '',
        },
        listCVEQuery: {
            current: 10,
            pageSize: 10, // 每页显示的条数
            total: 0, // 数据总数
        },
        data: [],
        uiList: [],
    }

    getCVETableData() {
        let data = this.state.queryKeys;
        data.page = this.state.listCVEQuery.current
        data.rows = this.state.listCVEQuery.pageSize
        console.log(data);
        getCVELoophole(data).then((res) => {
            console.log(res);
            this.setState({
                data: []
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