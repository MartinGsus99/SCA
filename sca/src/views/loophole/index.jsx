import React, { Component } from 'react';
import DynamicTabs from '@/components/Tabs';
import CVETable from './DatabaseTable/cveTable';
import CWETable from './DatabaseTable/cweTable';
import CPETable from './DatabaseTable/cpeTable';

class LooholeDataBase extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        items: [
            {
                key: '1',
                label: `CVE数据库`,
                children:(<CVETable></CVETable>),
            },
            {
                key: '2',
                label: `CPE数据库`,
                children:(<CPETable></CPETable>),
            },
            {
                key: '3',
                label: `CWE数据库`,
                children: (<CWETable></CWETable>),
            },
        ]
    }
    render() {
        return (
           <DynamicTabs items={this.state.items}></DynamicTabs>
        );
    }
}

export default LooholeDataBase;