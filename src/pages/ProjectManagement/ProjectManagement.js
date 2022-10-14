import React, { useState } from 'react'
import { Button, Space, Table } from 'antd';
import ReactHtmlParser from "react-html-parser"
import {DeleteOutlined,EditOutlined}from '@ant-design/icons';


const data = [
    {
        "id": 7969,
        "projectName": "stringaaaaaaa",
        "description": "<p>day la update 2</p>",
        "categoryId": 1,
        "categoryName": "Dự án web",
        "alias": "stringaaaaaaa",
        "deleted": false
    },
    {
        "id": 7998,
        "projectName": "adadadaa",
        "description": "fdqđqdq",
        "categoryId": 2,
        "categoryName": "Dự án phần mềm",
        "alias": "adadadaa",
        "deleted": false
    },
    {
        "id": 8061,
        "projectName": "Mike project 1",
        "description": "<p>this is my project to test, please don't delete. Appreciate!</p>",
        "categoryId": 1,
        "categoryName": "Dự án web",
        "alias": "mike-project-1",
        "deleted": false
    }
   
];

export default function ProjectManagement(props) {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };
    const columns = [
        {
            title: 'id',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            render:(text,record,index)=>{
                let jsxContent = ReactHtmlParser(text)
                return <div key={index}>{jsxContent}</div>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record,index) => (
              <Space size="middle">
                <a><EditOutlined /></a>
                <a><DeleteOutlined /></a>
              </Space>
            ),
          },
    ];


    return (
        <div className='container-fluid mt-5'>
            <h3>Project Management</h3>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={data} onChange={handleChange} />
        </div>
    )
}
