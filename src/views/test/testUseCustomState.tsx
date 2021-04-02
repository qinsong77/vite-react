import React, { useState } from 'react'


import useTestState from './testUseState'

function TestUseCustomState () {

	const [id, setId] = useState(1)

	const data = useTestState(id)

	return (
		<div className='search-result'>
			<button onClick={() => setId(2)}>test</button>
			<p>{ data }</p>
		</div>
	)
}

export default TestUseCustomState
