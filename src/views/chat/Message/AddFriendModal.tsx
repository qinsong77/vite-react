import React, { useEffect, useState } from 'react'
import { getCanAddUserList } from '../../../api'

import { Input, Modal, Select, Spin } from 'antd'

function AddFriendModal(props) {
	
	const [value, setValue] = useState({
		value: '',
		label: ''
	})
	const [userList, setUserList] = useState([])
	const [fetching, setFetching] = useState(false)
	const [input, setInput] = useState('')
	
	useEffect(() => {
		setValue({
			value: '',
			label: ''
		})
		
		setInput('')
		// fetchUser()
	}, [props.visible])
	
	useEffect(() => {
		fetchUser()
	}, [])
	
	const fetchUser = (val = '') => {
		setFetching(true)
		getCanAddUserList({
			current: 1,
			pageSize: 20,
			name: val
		})
			.then(res => {
				setUserList(res.data.data)
			})
			.finally(() => {
				setFetching(false)
			})
	}
	
	function selectChange(val) {
		console.log(val)
		setValue(val)
	}
	
	return (
		<Modal
			title="添加好友"
			visible={props.visible}
			confirmLoading={props.confirmLoading}
			onOk={() => props.handleOk(Object.assign(value, { remarks: input }))}
			onCancel={props.onCancel}
		>
			<Select
				// mode="multiple"
				labelInValue
				showSearch={true}
				value={value}
				placeholder="Select users"
				notFoundContent={fetching ? <Spin size="small"/> : null}
				filterOption={false}
				onSearch={fetchUser}
				onChange={selectChange}
				style={{ width: '100%', marginBottom: '20px' }}
			>
				{userList.map(d => (
					<Select.Option key={d.id}>{d.name}</Select.Option>
				))}
			</Select>
			
			<Input.TextArea onChange={(e) => setInput(e.target.value)} allowClear value={input} placeholder='请输入备注信息'/>
		</Modal>
	)
}

export default AddFriendModal
