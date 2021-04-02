import React, { useState, useContext } from 'react'

import { PlusOutlined, SearchOutlined, AlertFilled } from '@ant-design/icons'
import { Button, Divider, Input, message } from 'antd'

import AddFriendModal from './AddFriendModal'
import { addFriend } from '@api'
import Context from '../context'


function MiddleLayout() {
	const { state } = useContext(Context)
	const [visible, setVisible] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	
	function handleOk(val) {
		setConfirmLoading(true)
		const data = {
			responder: val.value,
			remarks: val.remarks
		}
		console.log(state.socket)
		if (state.socket.connected) {
			state.socket.emit('add_friend', data)
			setConfirmLoading(false)
			return message.success('发送请求成功')
		}
		addFriend(data).then(res => {
			setVisible(false)
			message.success('发送请求成功')
		}).finally(() => {
			setConfirmLoading(false)
		})
	}
	
	
	return (
		<div className='chat-layout-middle chat-contact-mid'>
			<div className='top-content'>
				<Input
					size='small'
					allowClear
					placeholder="搜索"
					prefix={<SearchOutlined className="top-icon"/>}
				/>
				<Button icon={<PlusOutlined/>} size='small' className='add-btn' onClick={() => setVisible(true)}/>
				<AddFriendModal visible={visible} handleOk={handleOk} onCancel={() => setVisible(false)}
				                confirmLoading={confirmLoading}/>
			</div>
			<label>新的朋友</label>
			<div className='new-friend-li'>
				<AlertFilled className='icon-avatar'/>
				<h4>新的朋友</h4>
			</div>
			<Divider/>
			<ul className='list-contact-container'>
				{
					state.friends.map((item, index) => (
						<li key={item.id}>
							<img className='avatar' src={window.publicPath + item.avatar}/>
							<p>{ item.name }</p>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default MiddleLayout
