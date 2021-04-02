import config from "@config"

export interface ChatStore {
	friends: Array<any>,
	currentFriend: object,
	messages: object,
	socket: any,
	userInfo: any,
	addFriendMessages: Array<any>
}

export const initialState: ChatStore = {
	friends: [],
	currentFriend: {},
	messages: {},
	socket: null,
	userInfo: config.getUserInfo(),
	addFriendMessages: []
}
