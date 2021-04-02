import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { registerUser } from '../../api'
import config from '../../config'
import './register.less'


export default function ({ history }) {
	
	const [btnLoading, setBtnLoading] = useState(false)

	const onFinish = values => {
		setBtnLoading(true)
		const { username, password, email } = values
			registerUser ({
				username,
				email,
				password
			}).then (res => {
				console.log (res)
				message.success('注册成功，跳转登录页..')
				setBtnLoading(false)
				history.push ('/login')
			}).catch(() => setBtnLoading(false))
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
						// label="用户名"
						name="email"
						rules={[{ required: true, message: '请输入邮箱!', type: 'email' }]}
					>
						<Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
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

					<Form.Item>
						<Button loading={btnLoading} type="primary" htmlType="submit" className='login-form-btn'>
							注册
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
