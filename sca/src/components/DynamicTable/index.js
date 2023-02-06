import React, { Component } from 'react';
import { Table } from 'antd';

class DynamicTable extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        const { uiList, data } = this.props;


        return (
            <Table
                columns={uiList} dataSource={data} pagination={false}></Table>
        );
    }
}

export default DynamicTable;