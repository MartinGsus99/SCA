import React, { useState } from "react";
import  Filter  from '@/components/Filter';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        queryKeys:[
          {
            id: 1,
            label: '报告名称：',
            key: 'reportName',
            placeholder: '报告名称',
          },
          {
            id: 2,
            label: '检测名称：',
            key: 'name',
            placeholder: '检测名称'
          },
          {
            id: 3,
            label: '语言类型',
            key: 'language',
            placeholder: '语言类型',
          },
          {
            id: 4,
            label: '时间范围',
            key: 'timerange',
            placeholder: '请选择时间范围'
          }
        ],
       
    }
  }

  render() { 
    return ( 
      <Filter queryKeys={this.state.queryKeys}></Filter>
     );
  }
}
 
export default History;