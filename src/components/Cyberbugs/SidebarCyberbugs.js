import {
	PlusOutlined,
	SearchOutlined,
	MenuFoldOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { OPEN_FORM_CREATE_TASK } from '../../redux/constants/CyberBugs/CyberBugs';
import FormCreateTask from './Forms/FormCreateTask/FormCreateTask';
const { Sider } = Layout;

export default function SidebarCyberbugs() {

	const dispatch = useDispatch()

	const [collapsed, setCollapsed] = useState(false);
	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className='text-right pr-2' onClick={()=>setCollapsed(!collapsed)} style={{color:"white",cursor:"pointer",fontSize:20}}><MenuFoldOutlined /></div>
			<div className="logo" />
			<Menu
				height="100%"
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				items={[
					{
						key: '1',
						icon: <PlusOutlined />,
						label: 'Create Issue',
						onClick: ()=>{
							dispatch({
								type:OPEN_FORM_CREATE_TASK,
								ComponentContentDrawer: <FormCreateTask/>,
								title:"Create Task"
							})
						}
					},
					{
						key: '2',
						icon: <SearchOutlined />,
						label: 'Search',
					},
				]}
			/>
		</Sider>
	);
}
