// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'

function useTestState (id) {
	const [data, setData] = useState(null)

	useEffect(() => {
		setData(new Date() + '--' + id)
	}, [id])

	return data
}

export default useTestState
