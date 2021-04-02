import React, { useState } from 'react'
import { message } from 'antd'

import MiddleLayout from './MiddleLayout'
import RightLayout from './RightLayout'
import AddFriendModal from './AddFriendModal'
import { addFriend } from '../../../api'

function Index() {
	
	const [visible, setVisible] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	
	function handleOk(val) {
		setConfirmLoading(true)
		addFriend({
			responder: val.value,
			remarks: val.remarks
		}).then(res => {
			console.log(res)
			setVisible(false)
			message.success('发送请求成功')
		}).finally(() => {
			setConfirmLoading(false)
		})
	}
	
	return (
		<>
			<AddFriendModal visible={visible} handleOk={handleOk} onCancel={() => setVisible(false)}
			                confirmLoading={confirmLoading}/>
			<MiddleLayout showAddFriendModal={() => setVisible(true)}/>
			<RightLayout showAddFriendModal={() => setVisible(true)}/>
		</>
	)
}

export default Index
