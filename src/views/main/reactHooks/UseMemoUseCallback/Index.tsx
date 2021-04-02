import React, { useState, useMemo } from 'react'
import Example from './Example'
import { Divider, Button } from 'antd'

const ExMemo = React.memo(Example)

export default function () {
    const [num, setNum] = useState(0)

    // 一个非常耗时的一个计算函数
    // result 最后返回的值是 49995000
    function expensiveFn() {
        let result = 0

        for (let i = 0; i < 10000; i++) {
            result += i
        }

        console.log(result) // 49995000
        return result
    }

    // const base = expensiveFn()

    const base = useMemo(expensiveFn, [])

    return (
        <div>
            <h3>example one</h3>
            <Example />
            <ExMemo />
            <Divider />
            <h3>count：{num}</h3>
            <Button onClick={() => setNum(num + base)}>+1</Button>
        </div>
    )
}
