import React, { useContext, useState } from 'react'

import {
	PlusOutlined,
	SearchOutlined
} from '@ant-design/icons'
import { Input, Button } from 'antd'


import Context from '../context'


function MiddleLayout(props) {
	const { state: { currentFriend, friends }, dispatch } = useContext(Context)
	

	function switchChat(item) {
		dispatch({
			type: 'set_current_friend',
			payload: {
				currentFriend: item
			}
		})
	}
	
	return (
		<div className='chat-layout-middle'>
			<div className='top-content'>
				<Input
					size='small'
					allowClear
					placeholder="搜索"
					prefix={<SearchOutlined className="top-icon"/>}
				/>
				<Button icon={<PlusOutlined/>} size='small' className='add-btn' onClick={() => props.showAddFriendModal()}/>
			</div>
			<ul className='list-friend-container'>
				{
					friends.map(item => (
						<li
							onClick={(e) => switchChat(item)}
							key={item.id} className={currentFriend.id ===item.id ? 'active-item' : ''}>
							<img className='avatar' src={ window.publicPath + item.avatar }/>
							<div className='list-middle'>
								<h5>{item.name}</h5>
								<p>{item.latestMessage}</p>
							</div>
							<span className='time'>{item.time}</span>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default MiddleLayout
