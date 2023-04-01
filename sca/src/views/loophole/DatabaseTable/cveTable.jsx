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
            limit: 10,
            total: 0,
            page: 1,
        },
        data:[],
        uiList:[],
    }

    getCVETableData() {
        let data =this.state.queryKeys;
        data.page = this.state.listCVEQuery.page
        data.rows = this.state.listCVEQuery.limit
        console.log(data);
        getCVELoophole(data).then((res) => {
            console.log(res);
            this.setState({
                data:[]
            })
        })
    }


    componentDidMount() {
        this.getCVETableData();
    }

    render() {
        return (
            <DynamicTable uiList={this.state.uiList} data={this.state.data} listQuery={this.state.listQuery}></DynamicTable>
        );
    }
}

export default CVETable;