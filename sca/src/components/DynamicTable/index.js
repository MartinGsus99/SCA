import React, { Component } from 'react';
import { Table, Pagination } from 'antd';

class DynamicTable extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        pagination: {
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
             showQuickJumper: true,
        },
    }
    render() {
        const onChange = () => {

        };
        const { uiList, data, listQuery } = this.props;

        // changePage = () => {
        //     this.setState({
        //         pagination: {
        //             pageSize: listQuery.limit,
        //         }
        //     })
        // }

        return (
            <div>
                <Table rowKey='id'
                    columns={uiList} dataSource={data} pagination={{ ...this.state.pagination }} ></Table>

                {/* <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} /> */}
            </div>
        );
    }
}

export default DynamicTable;