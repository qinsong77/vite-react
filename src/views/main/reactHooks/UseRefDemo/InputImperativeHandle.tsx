import React, { ChangeEvent, forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'

export interface InputProps {
    value?: string,
    onChange?: (value: string) => any
}

export interface XInput {
    focus: () => void;
    blur: () => void;
    setInputValue: (value: string) => void
}

function Input({ value, onChange }: InputProps, ref: Ref<XInput>) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [_value, setValue] = useState(value || '')

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current && inputRef.current.focus()
        },
        blur: () => {
            inputRef.current && inputRef.current.blur()
        },
        setInputValue: (value: string) => {
            setValue(value)
        }
    }))

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        console.log(value)
        setValue(value)
        onChange && onChange(value)
    }

    return (
        <div>
            <h4>自定义的useImperativeHandle Input组件</h4>
            <input value={_value} onChange={_onChange} ref={inputRef}/>
        </div>
    )
}

export default forwardRef(Input)
