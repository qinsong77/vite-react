import React, { useState } from 'react'
import { Button } from 'antd'
import GetRandomColor from './util'

export default function HookCount() {
    const [count, addCount, minusCount] = countNumber(0)
    const [theme, changeTheme] = changeThemeFunc('white')
    return (
        <div
            style={{
                backgroundColor: theme,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10
            }}
        >
            <p>You clicked {count} times</p>
            <Button onClick={addCount}>add</Button>
            <Button onClick={minusCount}>minus</Button>
            <Button onClick={changeTheme}>change Theme</Button>
        </div>
    )
}

function countNumber(initNumber) {
    const [count, setCount] = useState(initNumber)
    const addCount = () => setCount(count + 1)
    const minusCount = () => setCount(count - 1)
    return [count, addCount, minusCount]
}

function changeThemeFunc(initColor) {
    const [theme, changeTheme] = useState(initColor)
    const changeBackgroundColor = () => changeTheme(GetRandomColor())
    return [theme, changeBackgroundColor]
}
