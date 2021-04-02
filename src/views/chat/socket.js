import io from 'socket.io-client'
import localConfig from '@config'


function socket() {
	return io('http://localhost:3000', {
		path: '/socket/chat',
		reconnectionAttempts: 1,
		query: {
			token: 'Bearer ' + localStorage.getItem(localConfig.tokeKey) || ''
		}
		// transportOptions: {
		// 	polling: {
		// 		extraHeaders: {
		// 			[localConfig.tokeKey]: 'Bearer ' + localStorage.getItem(localConfig.tokeKey) || ''
		// 		}
		// 	}
		// }
	})
}

export default socket
