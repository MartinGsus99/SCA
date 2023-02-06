import React, { useState } from "react";
import  Filter  from '@/components/Filter';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        queryKeys:[
          {
            id:1,
            label:'名称',
            key:'name',
            placeholder:'请输入名称',
          },
          {
            id:2,
            label:'时间',
            key:'time',
            placeholder:'请输入时间'
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