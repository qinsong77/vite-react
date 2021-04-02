import React from 'react'
import { Spin } from 'antd'

function Loading() {
	return (
		<div style={{
			textAlign: 'center',
			height: '300px',
			lineHeight: '300px'
		}}>
			<Spin />
		</div>
	)
}

export default Loading
