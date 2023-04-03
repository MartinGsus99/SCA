import React, { Component } from 'react';
import { Table, Pagination } from 'antd';


class DynamicTable extends Component {
    constructor(props) {
        super(props);
    }
    state = {

    }

     onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        this.props.pagination(current,pageSize);
      };

    render() {
        console.log(this.state.dataSource);
        return (
            <div>
                <Table rowKey="id" columns={this.props.uiList} dataSource={this.props.data} pagination={false} />
                <br></br>
                <Pagination
                    showSizeChanger
                    total={this.props.pageData.total}
                    showTotal={(total) => `Total ${total} 条`}
                    defaultPageSize={this.props.pageData.pageSize}
                    defaultCurrent={this.props.pageData.current} onChange={this
                        .onShowSizeChange}
                />
            </div>
        );
    }
}

export default DynamicTable;