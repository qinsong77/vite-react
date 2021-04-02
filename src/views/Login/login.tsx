import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '../../api'
import config from '../../config'
import './login.less'


export default function ({ history, location }) {
	console.log(location.state)
	
	const [btnLoading, setBtnLoading] = useState(false)

	const onFinish = values => {
		setBtnLoading(true)
		const { username, password } = values
			login ({
				username,
				password
			}).then (res => {
				console.log (res)
				if (res.data && res.data.token) {
					localStorage.setItem (config.tokeKey, res.data.token)
					config.setUserInfo(res.data.data)
					if (location.state && location.state.from && location.state.from.pathname) history.push (location.state.from.pathname)
					else history.push ('/')
				}
			}).finally(() => setBtnLoading(false))
	}

	const onFinishFailed = errorInfo => {
		console.log ('Failed:', errorInfo)
	}

	return (
		<div className='login-container'>
			<div className='login-form'>
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						// label="用户名"
						name="username"
						rules={[{ required: true, message: '请输入用户名!' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
					</Form.Item>

					<Form.Item
						// label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码!' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="请输入密码"
						/>
					</Form.Item>

					<Form.Item name="remember" valuePropName="checked">
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button loading={btnLoading} type="primary" htmlType="submit" className='login-form-btn'>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
