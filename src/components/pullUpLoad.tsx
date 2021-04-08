import React, { useEffect, useRef, useState } from 'react'
import { Simulate } from 'react-dom/test-utils'

type Props = {
    getList: () => Promise<any>,
    addData: (any) => void,
    children: React.ReactNode,
    height: number,
    distance?: number
}

export default function UsePullUpLoadMore({ height, children, getList, addData, distance = 20 }: Props) {
    const [loading, setLoading] = useState(false)
    const ref = useRef(null)
    console.log('render')
    function onscroll(e) {
        const clientHeight = ref.current.clientHeight
        const scrollTop = ref.current.scrollTop
        const scrollHeight = ref.current.scrollHeight
        if (!loading && (scrollTop + clientHeight >= (scrollHeight - distance))) {
            setLoading(true)
            getList()
                .then(res => {
                    addData(res)
                    setLoading(false)
                })
        }
    }
    
    return (
        <div ref={ref} style={{ height: height + 'px', overflow: 'auto' }} onScroll={onscroll}>
            {children}
            {
                loading && <p style={{ color: 'red' }}>加载中</p>
            }
        </div>)
    
}
