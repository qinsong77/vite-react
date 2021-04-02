import React, { useContext } from 'react'
import { Button, Divider, Typography, message, Empty } from 'antd'
import { agreeAddFriend } from '@api'
import Context from '../context'

const { Text } = Typography

function AddMessageList(): JSX.Element {
	
	const { state } = useContext(Context)
	
	function agreeAdd(id) {
		if (state.socket.connected) {
			state.socket.emit('agree_add_friend', id)
			
			return message.success('添加成功！')
		}
		agreeAddFriend({
			msgId: id
		}).then(res => {
			message.success('添加成功！')
		})
	}
	
	return (
		<div className='chat-layout-right contact-right'>
			<h3>新的朋友</h3>
			<Divider/>
			{
				state.addFriendMessages.length === 0 ? (<Empty
					style={{ marginTop: '30%' }}
					description="暂无添加好友请求">
				</Empty>): (
					<ul>
						{
							state.addFriendMessages.map(v => <Item key={v.id} {...v} agreeAdd={agreeAdd}/>)
						}
					</ul>
				)
			}
			
		</div>
	)
}



function Item(props) {
	return (
		<>
			<li>
				<div className='right-content'>
					<img className='avatar' src={window.publicPath + props.sender.avatar }/>
					<div>
						<p className='name'>{props.sender.name}</p>
						<p className='remarks'>{props.remarks}</p>
					</div>
				</div>
				{props.status === 0 ? <Button size='small' type="primary" onClick={() => props.agreeAdd(props.id)}>接受</Button> :
					<Text>已接受</Text>}
			</li>
			<Divider/>
		</>
	)
}

export default AddMessageList
