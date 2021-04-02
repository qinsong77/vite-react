import React, { useContext, useState } from 'react'
import { Button, Divider, Empty } from 'antd'
import { FolderOpenOutlined } from '@ant-design/icons'
import './RigtLayout.less'
import Context from '../context'

function RightLayout(props) {
	const { state: { socket, messages, currentFriend, userInfo, friends }, dispatch } = useContext(Context)
	const [content, setContent] = useState('')
	
	function sendMessage() {
		const message = {
			content,
			friendId: currentFriend.id,
			time: new Date(),
			type: 0
		}
		socket.emit('send', message)
		dispatch({
			type: 'add_message',
			payload: {
				message: {
					...message,
					self: true
				}
			}
		})
		setContent(state => '')
	}
	
	function textAreaOnPress(e) {
		if (e.nativeEvent.keyCode === 13) {
			sendMessage()
		}
	}
	
	return (
		<div className='chat-layout-right message-right'>
			{
				friends.length === 0 ? (
						<Empty
							style={{ marginTop: '30%' }}
							description="快去添加好友吧">
							<Button type="primary" onClick={() => props.showAddFriendModal()}>Add Now</Button>
						</Empty>
					) :
					<>
						<h3>{currentFriend.name}</h3>
						<Divider/>
						<ul className='message-list'>
							{
								Array.isArray(messages[currentFriend.id]) && messages[currentFriend.id].map(item => {
									return <li
										key={item.friendId + item.time}
										className={item.self ? 'right' : 'left'}
									>
										<img
											src={item.self ? window.publicPath + userInfo.avatar : window.publicPath + currentFriend.avatar}
											className='avatar'/>
										<div className='message-content'>
											{item.content}
										</div>
									</li>
								})
							}
						</ul>
						<div className='send-message-container'>
							<div className='send-message-tools'>
								<FolderOpenOutlined className='icon'/>
							</div>
							<div>
					<textarea
						value={content}
						onChange={(event => setContent(event.target.value))}
						onKeyPress={(e) => textAreaOnPress(e)}/>
							</div>
							<Button size='small' onClick={() => sendMessage()}>发送(S)</Button>
						</div>
					</>
			}
		</div>
	)
}

export default RightLayout
