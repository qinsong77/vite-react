import React, { useEffect, useState, useContext } from 'react'

import { Input, message, Modal, Upload } from 'antd'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { editUser, upload } from '@api'
import config from '@config'
import Context from './context'

function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!')
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!')
	}
	return isJpgOrPng && isLt2M
}


function EditUserInfoModal(props) {
	
	const { state: {  userInfo }, dispatch} = useContext(Context)
	
	const [state, setState] = useState({
		confirmLoading: false,
		name: '',
		avatar: ''
	})
	
	const [uploading, setUploading] = useState(false)
	
	useEffect(() => {
		setState({
			name: userInfo.name,
			avatar: userInfo.avatar,
			confirmLoading: false
		})
	}, [])
	
	function updateName(e) {
		setState({
			...state,
			name: e.target.value
		})
	}
	
	const uploadButton = (
		<div>
			{uploading ? <LoadingOutlined/> : <PlusOutlined/>}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)
	
	function handleChange(info) {
		if (info.file.status === 'uploading') {
			setUploading(true)
			return
		}
		if (info.file.status === 'done') {
			setUploading(false)
			// Get this url from response in real world
		}
	}
	
	function handleOk() {
		setState(state => {
			return {
				...state,
				confirmLoading: true
			}
		})
		
		editUser(userInfo.id, {
			name: state.name,
			avatar: state.avatar
		}).then(res => {
			dispatch({
				type: 'save_user_info',
				payload: {
					userInfo: res.data
				}
			})
			config.setUserInfo(res.data)
			message.success('修改成功!')
			props.onOk()
		}).finally(() => {
			setState(state => {
				return {
					...state,
					confirmLoading: false
				}
			})
		})
	}
	
	function customRequest(options) {
		const { onSuccess, onError, file, onProgress } = options
		
		setUploading(true)
		setState({
			...state,
			avatar: ''
		})
		
		const formData = new FormData()
		formData.append('file', file)
		upload(formData)
			.then(res => {
				setUploading(false)
				setState({
					...state,
					avatar: res.data
				})
				message.success('上传成功!')
			}).catch(e => {
			setUploading(false)
		})
	}
	
	return (
		<Modal
			title="修改个人信息"
			visible={props.visible}
			confirmLoading={state.confirmLoading}
			onOk={() => handleOk()}
			onCancel={props.onCancel}
		>
			
			<Input onChange={(e) => updateName(e)} allowClear value={state.name} placeholder='请输入姓名'/>
			
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				beforeUpload={beforeUpload}
				onChange={handleChange}
				customRequest={customRequest}
			>
				{state.avatar ?
					<img src={window.publicPath + state.avatar} alt="avatar" style={{ width: '100%' }}/> : uploadButton}
			</Upload>
		
		</Modal>
	)
}

export default EditUserInfoModal
