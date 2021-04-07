import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import './list-view.less'
import { Data } from './index'

function throttle (fn, wait = 50) {
	let timer = null
	return function () {
		const args = arguments
		// @ts-ignore
		const context = this
		if (timer) return
		timer = setTimeout(() => {
			fn.apply(context, args)
			timer = null
		}, wait)
	}
}

type Props = {
	data: Data [],
	itemHeight?: number,
	render: (item: Data) => React.ReactNode
}

function ListView({ data, itemHeight = 30, render}: Props) {
	
	const [items, setItems ] = useState<Data []>([])
	const [transX, setTransX ] = useState<number>(0)
	
	const contentHeight = useMemo(() => {
		return data.length * itemHeight + 'px'
	}, [data])
	
	const ref = useRef(null)
	
	const onScroll = useCallback(throttle(updateVisibleData, 50), [])
	
	useEffect(() => {
		const visibleCount = Math.ceil(ref.current.clientHeight / itemHeight)
		setItems(data.slice(0, visibleCount))
	},[])
	
	
	function updateVisibleData() {
		console.log(1)
		const scrollTop = ref.current.scrollTop || 0
		const visibleCount = Math.ceil(ref.current.clientHeight / itemHeight)
		const start = Math.floor(scrollTop / itemHeight)
		const end = start + visibleCount
		setItems(data.slice(start, end))
		setTransX(start * itemHeight)
	}
	
	return (
		<div className='list-view' onScroll={onScroll} ref={ref}>
			<div className='list-view-phantom' style={{ height: contentHeight }}/>
			<div
				className='list-view-content'
				style={{ transform: `translate3d(0, ${transX}px, 0)`}}>
				{ items.map(item => <div className='list-view-item' key={item.id}>{  render(item) }</div>)}
			</div>
		</div>
	)
}

export default ListView
