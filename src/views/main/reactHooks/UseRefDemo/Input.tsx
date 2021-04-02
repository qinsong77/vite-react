import React, { ChangeEvent, forwardRef, useState } from 'react'

export interface InputProps {
    value?: string,
    onChange?: (value: string) => void
}

function Input({ value, onChange }: InputProps, ref: any) {
    const [_value, setValue] = useState(value || '')

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setValue(value)
        onChange && onChange(value)
    }

    return (
        <div>
            <h4>自定义Input组件</h4>
            <input value={_value} onChange={_onChange} ref={ref}/>
        </div>
    )
}

export default forwardRef(Input)
