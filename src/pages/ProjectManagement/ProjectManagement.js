import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import ReactHtmlParser from "react-html-parser"
import {DeleteOutlined,EditOutlined}from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';



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

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({
            type:"GET_LIST_PROJECT_SAGA"
        })
    },[])

    const projectList = useSelector(state => state.ProjectCyberbugsReducer.projectList)


    const columns = [
        {
            title: 'id',
            dataIndex: 'categoryId',
            key: 'categoryId',
            sorter: (item2,item1)=>{
                return item2.id -item1.id
            },
            sortDirections:["descend"],
        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter:(item2,item1) =>{
                let projectName1= item1.projectName?.trim().toLowerCase()
                let projectName2= item2.projectName?.trim().toLowerCase()
                if(projectName2 < projectName1){
                    return -1
                }
                return 1
            }
        },
        {
            title: 'category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter:(item2,item1) =>{
                let categoryName1= item1.categoryName?.trim().toLowerCase()
                let categoryName2= item2.categoryName?.trim().toLowerCase()
                if(categoryName2 < categoryName1){
                    return -1
                }
                return 1
            }
        },
        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render:(text,record,index)=>{
        //         let jsxContent = ReactHtmlParser(text)
        //         return <div key={index}>{jsxContent}</div>
        //     }
        // },
        {
            title:"creator",
            key:"creator",
            render:(text,record,index)=>{
                return <Tag color="orange" key={index}>{record.creator?.name}</Tag>
            },
            sorter:(item2,item1) =>{
                let creator1= item1.creator.name?.trim().toLowerCase()
                let creator2= item2.creator.name?.trim().toLowerCase()
                if(creator2 < creator1){
                    return -1
                }
                return 1
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record,index) => (
                <div>
                    <button className='btn mr-2 btn-primary'>
                        <EditOutlined style={{fontSize:17}}/>
                    </button>
                    <button className='btn btn-danger'>
                        <DeleteOutlined style={{fontSize:17}}/>
                    </button>
                </div>
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
            <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}
