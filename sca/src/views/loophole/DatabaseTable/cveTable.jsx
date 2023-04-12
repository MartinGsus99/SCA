import React, { useEffect } from 'react';
import DynamicTable from '@/components/DynamicTable';
import { getCVELoophole } from '@/api/knowledge';
import { useState } from 'react';


function CVETable() {
    const [queryKeys, setqueryKeys] = useState({
        type: '0',
        cveId: '',
        kind: '0',
        start_date: '',
        end_date: '',
    });

    const [listCVEQuery, setListCVEQuery] = useState({ 
        page: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        onChange:(page, pageSize) => {
            let query = JSON.parse(JSON.stringify(listCVEQuery))
            listCVEQuery.page = page
            setListCVEQuery(query)
            fetchCVETableData(listCVEQuery);
          },
        onShowSizeChange:(page, pageSize) => {
            let query = JSON.parse(JSON.stringify(listCVEQuery))
            listCVEQuery.pageSize = pageSize
            setListCVEQuery(query)
            fetchCVETableData(listCVEQuery);
        },
     });

    const [uiList, setuilist] = useState([{
        dataIndex: 'cveId',
        title: 'CVE编号',
    },

    {
        dataIndex: 'gmtPublished',
        title: '收录时间',
    },
    {
        dataIndex: 'gmtModified',
        title: '更新时间',
    },
    {
        dataIndex: 'description',
        title: '描述',
        render: (row) => {
            if (row.length >= 50) {
                return row.slice(0, 50) + '......';
            }
        }
    }
    ])

    const [cveData, setCveData] = useState([]);


    const getCVETableData = () => {
        let data = queryKeys;
        data.page = listCVEQuery.page;
        data.rows = listCVEQuery.pageSize
        console.log(data);
        getCVELoophole(data).then((res) => {
            const result = res.data.data;
            const pageData = {
                total: res.data.total,
                pageSize: res.data.rows,
                current:res.data.page
            }
            setCveData(result.reverse());
            setListCVEQuery(pageData);
        })
    }

    const fetchCVETableData = (listCVEQueryData) => {
        let data = queryKeys;
        console.log('listQ',listCVEQueryData);
        data.page = listCVEQueryData.page;
        data.rows = listCVEQueryData.pageSize
        console.log('data',data);
        getCVELoophole(data).then((res) => {
            const result = res.data.data;
            const pageData = {
                total: res.data.total,
                pageSize: res.data.rows,
                current:res.data.page
            }
            setCveData(result.reverse());
            setListCVEQuery(pageData);
        })
    }


    useEffect(() => {
        getCVETableData();
    }, [])

    return (
        <DynamicTable uiList={uiList} data={cveData} pageData={listCVEQuery} getData={getCVETableData}></DynamicTable>
    )
}

export default CVETable;

