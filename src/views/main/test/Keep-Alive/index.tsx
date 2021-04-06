import React, {useState} from 'react'
import KeepAlive, { AliveScope } from './Keep-Alive'

function Counter() {
	const [count, setCount] = useState(0)
	return (
		<div>
			count: {count}
			<button onClick={() => setCount((count) => count + 1)}>add</button>
		</div>
	)
}

function App() {
	const [show, setShow] = useState(true)
	return (
		<AliveScope>
			<div>
				<button onClick={() => setShow((show) => !show)}>Toggle</button>
				<p>无 KeepAlive</p>
				{show && <Counter/>}
				<p>有 KeepAlive</p>
				{show && (
					<KeepAlive id='Test'>
						<Counter/>
					</KeepAlive>
				)}
				<hr/>
				{show && (
					<KeepAlive id='Test2'>
						<Counter/>
					</KeepAlive>
				)}
			</div>
		</AliveScope>
	)
}

export default App
