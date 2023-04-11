import React, { Component } from 'react';
import { Space, Table, Tag, Pagination } from 'antd';
import { useState } from 'react';
const { Column, ColumnGroup } = Table;

class DynamicTable extends Component {
    constructor(props) {
        super(props);
    }
    state = {

    }

    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        // this.props.pagination(current, pageSize);
    };



    render() {
        return (
            <div>
               <div>{this.props.count}</div>
                <Table dataSource={this.props.data} columns={this.props.uiList} pagination={this.props.pageData}></Table>
            </div >
        );
    }
}

export default DynamicTable;