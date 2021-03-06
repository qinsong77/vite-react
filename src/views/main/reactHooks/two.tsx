// import React, { useState } from 'react'
//
// function SubCounter(props) {
// 	const [state, setState] = useState(props.state) // 不会跟着props 变化
// 	return (
// 		<div>
// 			<h1>child</h1>
// 			<p>{props.state}</p>
// 			<p>{state}</p>
// 			<button onClick={() => setState(prevState => prevState + 1)}>add</button>
// 		</div>
// 	)
// }
//
// export default function () {
// 	const [state, setState] = useState(100)
// 	return (
// 		<div>
// 			<p>{state}</p>
// 			<button onClick={() => setState(prevState => prevState + 1)}>add</button>
// 			<SubCounter state={state}/>
// 		</div>
// 	)
// }

import React, { memo, useCallback, useMemo, useState } from 'react'

function SubCounter({ onClick, data }) {
	console.log('SubCounter render')
	return (
		<button onClick={onClick}>{data.number}</button>
	)
}

const SubCounter2 = memo(SubCounter)

let oldData; let oldAddClick
export default function Counter2() {
	console.log('Counter render')
	const [name, setName] = useState('计数器')
	const [number, setNumber] = useState(0)
	// 父组件更新时，这里的变量和函数每次都会重新创建，那么子组件接受到的属性每次都会认为是新的
	// 所以子组件也会随之更新，这时候可以用到 useMemo
	// 有没有后面的依赖项数组很重要，否则还是会重新渲染
	// 如果后面的依赖项数组没有值的话，即使父组件的 number 值改变了，子组件也不会去更新
	// const data = useMemo(()=>({number}),[]);
	const data = useMemo(() => ({ number }), [number])
	console.log('data===oldData ', data === oldData)
	oldData = data
	
	// 有没有后面的依赖项数组很重要，否则还是会重新渲染
	const addClick = useCallback(() => {
		setNumber(number + 1)
	}, [number])
	console.log('addClick===oldAddClick ', addClick === oldAddClick)
	oldAddClick = addClick
	return (
		<>
			<input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
			<SubCounter2 data={data} onClick={addClick}/>
		</>
	)
}
