import axios from '@common/axios'

export const registerUser = (data) => {
	return axios.request({
		url: '/public/auth/register',
		method: 'post',
		data
	})
}
export const login = (data) => {
	return axios.request({
		url: '/public/auth/login',
		method: 'post',
		data
	})
}

export const editUser = (id, data) => {
	return axios.request({
		url:'/user/' + id,
		method: 'put',
		data
	})
}

export const getUserDetail = (id) => {
	return axios.request({
		url: `/users/${id}`,
		method: 'get'
	})
}

interface queryParams {
	current: number,
	pageSize: number,
	name?: string
}

export const getUsers = (params: queryParams) => {
	return axios.request({
		url: '/users/list',
		method: 'get',
		params
	})
}

export const getCanAddUserList = (params) => {
	return axios.request({
		url: '/chat/canAddUserList',
		method: 'get',
		params
	})
}

export const getFriends = (params) => {
	return axios.request({
		url: '/chat/listFriends',
		method: 'get',
		params
	})
}

export const getHistoryMessages = (params) => {
	return axios.request({
		url: '/chat/listHistoryMessages',
		method: 'get',
		params
	})
}

export const getAddMessage = (params) => {
	return axios.request({
		url: '/chat/listAddFriendMessage',
		method: 'get',
		params
	})
}


export const addFriend = (data) => {
	return axios.request({
		url: '/chat/sendAddFriendMessage',
		method: 'post',
		data
	})
}

export const agreeAddFriend = (data) => {
	return axios.request({
		url: '/chat/agreeAddFriend',
		method: 'post',
		data
	})
}


export const uploadFile = (data) => {
	return axios.request({
		url: '/user/uploadFile',
		headers: { "Content-Type": "multipart/form-data" },
		method: 'post',
		data
	})
}

export const uploadFileMerge = (data) => {
	return axios.request({
		url: '/user/uploadFile/merge',
		method: 'post',
		data
	})
}
