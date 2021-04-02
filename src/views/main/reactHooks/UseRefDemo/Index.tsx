import React, { useRef, createRef, useState } from 'react'

import { Button, Divider } from 'antd'
import Input from './Input'
import InputImperativeHandle from './InputImperativeHandle'
import Compare from './Compare'
import ExampleDemo from './ExampleDemo'
import OldWayParentCallChild from './OldWayParentCallChild'

class FocusInputCls extends React.Component<any, any> {
    textInput = createRef<HTMLInputElement>()
    focusTextInput = () => {
        if (this.textInput.current) {
            this.textInput.current.focus()
        }
    }

    render() {
        return (
            <>
                <h3>focus by class component</h3>
                <input type='text' ref={this.textInput} />
                <Button onClick={this.focusTextInput}>点击我让input 0组件获得焦点</Button>
            </>
        )
    }
}

function FocusInputByHooks() {
    const inputRef = useRef<HTMLInputElement>(null)
    const inputRefTwo = useRef<HTMLInputElement>(null)
    const inputRefThree = useRef<any>(null)

    const [text, setText] = useState('')

    const focusTextInput = () => {
        console.log(inputRef)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const focusTextInputThree = () => {
        console.log(inputRefThree)
        if (inputRefThree.current) {
            console.log(inputRefThree.current)
            inputRefThree.current.focus()
            inputRefThree.current.setInputValue('hello world')
        }
    }

    return (
        <>
            <input type='text' ref={inputRef} />
            <Button onClick={focusTextInput}>点击我让input 1组件获得焦点</Button>
            <Divider />
            <Input ref={inputRefTwo} />
            <Button onClick={() => inputRefTwo.current && inputRefTwo.current.focus()}>
                点击我让自定义input 2组件获得焦点
            </Button>
            <Divider />
            <InputImperativeHandle ref={inputRefThree} onChange={setText} value={text} />
            <Button onClick={focusTextInputThree}>点击我，input 3组件获得焦点</Button>
            <div>input 3 text: {text}</div>
        </>
    )
}

export default function () {
    return (
        <div>
            <FocusInputCls />
            <Divider />
            <FocusInputByHooks />
            <Divider />
            <Compare />
            <Divider />
            <ExampleDemo />
            <Divider />
            <OldWayParentCallChild />
        </div>
    )
}
