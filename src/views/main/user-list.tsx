import React, { useEffect, useState } from 'react'
import { Card, Table, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { getUsers, getUserDetail } from '@api'
import useData from '../../store/useData'

export default function () {
	
	const [data, fetchData] = useData(getUsers)
	

	
	
	// eslint-disable-next-line max-params
	const handleTableChange = (pagination, filters, sorter, extra) => {
		console.log(pagination)
		if (extra.action === 'paginate') {
			fetchData(pagination)
		}
	}
	
	const deleteUser = (record)=> {
		console.log(record)
	}
	
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: {
				compare: (a, b) => a.id - b.id,
			},
		},
		{
			title: 'Name',
			dataIndex: 'name'
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'action',
			dataIndex: 'action',
			render: (text, record, index) => <a onClick={() => deleteUser(record)}>删除</a>
		}
	]
	return (
		<Card>
			<h1>Users</h1>
			<Table
				bordered={true}
				columns={columns}
				rowKey={record => record.id}
				dataSource={data.data}
				pagination={data.pagination}
				loading={data.loading}
				onChange={handleTableChange}
			/>
		</Card>
	)
}
