import React, { useState, useRef, useEffect } from 'react'

const usePrevious = (state: any) => {
    const ref = useRef()
    useEffect(() => {
        ref.current = state
    })

    return ref.current
}


export default function () {
    const [ counter, setCounter ] = useState(0)
    const prevCounter = usePrevious(counter)

    return (
        <div>
            <button onClick={() => setCounter(counter+1)}>+ 1</button>
            <button onClick={() => setCounter(counter-1)}>- 1</button>
            <p>Now: { counter}, before: { prevCounter }</p>
        </div>
    )
}
