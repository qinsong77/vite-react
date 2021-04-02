import React, { useState, useReducer } from 'react'
import { Card, List, Input, Button, Row, Col, Divider } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import reducer from './reducer'

const initialState = [{
	title: 'initial',
	id: new Date().getTime()
}]

function TestReducer () {
	const [list, dispatch] = useReducer(reducer, initialState)

	const [input, setInput] = useState('')

	function add () {
		dispatch({
			type: 'add',
			payload: {
				title: input,
				id: new Date().getTime(),
				completed: false
			}
		})
	}

	function remove (id) {
		dispatch({
			type: 'remove',
			payload: id
		})
	}

	return (
		<div style={{marginTop: '50px'}}>
			<Card title='Todo List' style={{width: 500, margin: '20px auto 0 auto'}}>
				<Row gutter={16}>
					<Col span={20}>
						<Input onPressEnter={(e) => add()} onChange={(e) => setInput(e.target.value)}/>
					</Col>
					<Col span={4}>
						<Button icon={<PlusOutlined/>} type='primary' block onClick={() => add()}/>
					</Col>
				</Row>
				<Divider orientation="left">List</Divider>
				<List
					itemLayout="horizontal"
					dataSource={list}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								title={item.title}
								description={new Date(item.id).toLocaleString()}
							/>
							<Button icon={<DeleteOutlined />} onClick={() => remove(item.id)}/>
						</List.Item>
					)}
				/>
			</Card>
		</div>
	)
}

export default TestReducer
