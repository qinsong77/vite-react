import React, { memo, useState } from 'react'
import { Divider } from 'antd'

function Counter1(props) {
    console.log(props)
    console.log(`Counter ${props.name} render`)

    // 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
    function getInitState() {
        return { number: props.number }
    }
    const number1 = props.number
    let [counter, setCounter] = useState(getInitState())
    let [counter1, setCounter2] = useState(number1)
    return (
        <>
            <h1>name: {props.name}</h1>
            <p>{counter.number}</p>
            <p>{props.number}</p>
            <p>{counter1}</p>
            <button onClick={() => setCounter({ number: counter.number + 1 })}>+</button>
            <button onClick={() => setCounter(counter)}>setCounter</button>
        </>
    )
}

const Counter1Memo = memo(Counter1)

function Test() {
    console.log('render 1')
    const [state, setState] = useState(111)

    const [obj, setObj] = useState({
        a: 1,
        b: 2
    })
    function test() {
        obj.a = 2
        // setObj({ ...obj, a: 12})
        setObj(obj)
        console.log(obj)
    }
    console.log(obj)
    function AlertNum() {
        setState(state + 1)
        setTimeout(() => {
            setState((number) => number + 1)
            // setSate((state+1)) // 不起作用
            alert(state) // 0
        }, 3000)
    }

    return (
        <div>
            <p>{state}</p>
            <p>{obj.a}</p>
            <p>{obj.b}</p>
            <button onClick={() => setState((prev) => prev + 1)}>add</button>
            <button onClick={() => test()}>test</button>
            <br />
            <button onClick={AlertNum}>AlertNum</button>
            <Counter1 number={state} name='1' key={1} />
            <Counter1 number={12} name='2' key={2} />
            <Counter1Memo number={state} name='3' key={3} />
            <Counter1Memo number={12} name='4' key={4} />
            <Divider />
            <Example />
        </div>
    )
}

function Example() {
    return (
        <div
            tabIndex={1}
            onFocus={(e) => {
                if (e.currentTarget === e.target) {
                    console.log('focused self')
                } else {
                    console.log('focused child', e.target)
                }
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    // Not triggered when swapping focus between children
                    console.log('focus entered self')
                }
            }}
            onBlur={(e) => {
                if (e.currentTarget === e.target) {
                    console.log('unfocused self')
                } else {
                    console.log('unfocused child', e.target)
                }
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    // Not triggered when swapping focus between children
                    console.log('focus left self')
                }
            }}
        >
            <input id='1' />
            <input id='2' />
        </div>
    )
}

export default Test
