import React, { useReducer } from 'react'
import { Button  } from "antd"

enum Actions {
    Increment = 'Increment',
    Decrement = 'Decrement',
    Rest = 'Rest'
}

const Reducer = (state:number, action: Actions) => {
    switch (action) {
        case Actions.Increment:
            return state + 1
        case Actions.Decrement:
            return state - 1
        case Actions.Rest:
            return  0
        default:
            return state
    }
}


export default function ReactHooksWay() {
    const initialState: number = 0
    const [counter, dispatch] = useReducer(Reducer, initialState)
    return (
        <div>
           <h3>counter: { counter}</h3>
            <Button onClick={() => dispatch(Actions.Increment)}>{ Actions.Increment }</Button>
            <Button onClick={() => dispatch(Actions.Decrement)}>{ Actions.Decrement }</Button>
            <Button onClick={() => dispatch(Actions.Rest)}>{ Actions.Rest }</Button>
        </div>
    )
}
