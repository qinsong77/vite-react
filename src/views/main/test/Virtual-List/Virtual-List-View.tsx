import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import './list-view.less'
import { Data } from './index'


type Props = {
	containerHeight: number
	data: Data [],
	itemHeight?: number,
	render: (item: Data) => React.ReactNode,
	estimatedItemSize: number
}

type Position = {
	index: 0,
	top: number,
	bottom: number,
	height: number
}

function VirtualListView({ data, estimatedItemSize, itemHeight = 30, containerHeight = 500, render}: Props) {
	
	const [items, setItems ] = useState<Data []>([])
	const [transX, setTransX ] = useState<number>(0)
	
	// @ts-ignore 好像是ts的问题，没有识别map?
	const [positions, setPositions ] = useState<Position []>(() => {
		return data.map(((value, index) => {
			return {
				index,
				height: estimatedItemSize,
				top: index * estimatedItemSize,
				bottom: (index + 1) * estimatedItemSize
			}
		}))
	})
	
	const contentHeight = useMemo(() => {
		return data.length * itemHeight + 'px'
	}, [data])
	
	const ref = useRef(null)
	
	const onScroll = useCallback(updateVisibleData, [])
	
	useEffect(() => {
		const visibleCount = Math.ceil(ref.current.clientHeight / itemHeight)
		setItems(data.slice(0, visibleCount))
	},[])
	
	
	function updateVisibleData() {
		const scrollTop = ref.current.scrollTop || 0
		const visibleCount = Math.ceil(ref.current.clientHeight / itemHeight)
		const start = Math.floor(scrollTop / itemHeight)
		const end = start + visibleCount
		setItems(data.slice(start, end))
		setTransX(start * itemHeight)
	}
	
	return (
		<div className='list-view' onScroll={onScroll} ref={ref} style={{ height: containerHeight + 'px' }}>
			<div className='list-view-phantom' style={{ height: contentHeight }}/>
			<div
				className='list-view-content'
				style={{ transform: `translate3d(0, ${transX}px, 0)`}}>
				{ items.map(item => <div className='list-view-item' key={item.id}>{  render(item) }</div>)}
			</div>
		</div>
	)
}

export default VirtualListView
