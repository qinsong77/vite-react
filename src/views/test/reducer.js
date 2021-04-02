function reducer (state, { type, payload}) {
	console.log(state)
	console.log(type)
	console.log(payload)
	switch (type) {
		case 'add':
			return [
				...state,
				payload
			]
		case 'remove':
			state.splice(state.findIndex(v => v.id === payload), 1)
			return [...state]
		case 'toggle':
			return state.map(todo => todo.id === payload.id ? {...todo, completed: !todo.completed} : todo)
		default:
			throw new Error()
	}
}

export default reducer
