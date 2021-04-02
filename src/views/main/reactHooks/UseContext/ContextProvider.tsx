import React, { createContext, useState, Dispatch, ReactNode } from 'react'

interface Injected  {
    counter: number,
    setCounter: Dispatch<any>,
    increment: () => any,
    decrement: () => any
}
// eslint-disable-next-line
export const context = createContext<Injected>({} as Injected)


interface Props {
    children?: ReactNode
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function CounterProvider({ children }: Props) {
    const [counter, setCounter] = useState(0);

    const value = {
        counter,
        setCounter,
        increment: () => setCounter(counter + 1),
        decrement: () => setCounter(counter - 1)
    }

    return (
        <context.Provider value={value}>{children}</context.Provider>
    )
}
