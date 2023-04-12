import React, { Component } from 'react'
import { Space, Table, Tag, Pagination, Button } from 'antd'
import { useState } from 'react'

function DynamicTable (props) {
    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize)
    }

    return (
        <div>
            <Table rowKey="id" dataSource={props.data} columns={props.uiList} align="center" pagination={props.pageData} onShowSizeChange={onShowSizeChange} ></Table>
        </div >
    )
}


export default DynamicTable