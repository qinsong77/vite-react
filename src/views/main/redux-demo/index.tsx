import React from 'react'
import { Provider } from '@src/store/redux/Provider'
import { createStore } from '@src/store/redux'
import { reducer } from '@src/store/redux/reducer'
import TestApp from './App'

/** old 没有使用高阶函数传参
let store = createStore(reducer)

function logger(store) {
    let next = store.dispatch
    return (action) => {
        console.log('logger1')
        let result = next(action)
        return result
    }
}

function thunk(store) {
    let next = store.dispatch
    return (action) => {
        console.log('thunk')
        return typeof action === 'function' ? action(store.dispatch) : next(action)
    }
}

function logger2(store) {
    let next = store.dispatch
    return (action) => {
        console.log('logger2')
        let result = next(action)
        return result
    }
}

function applyMiddleware(store, middlewares) {
    middlewares = [ ...middlewares ]
    middlewares.reverse()
    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)
    )
}

applyMiddleware(store, [ logger, thunk, logger2 ])
 **/
// 中间件柯里化
const logger = store => next => action => {
    console.log('logger1')
    let result = next(action)
    return result
}
const thunk = store => next => action => {
    console.log('thunk')
    const { dispatch, getState } = store
    return typeof action === 'function' ? action(store.dispatch) : next(action)
}

const logger2 = store => next => action => {
    console.log('log2')
    let result = next(action)
    return result
}
function compose(...fns) {
    if(fns.length === 0) return arg => arg
    if(fns.length === 0) return fns[0]
    return fns.reduce((res, cur) => (...args) => res((cur(...args))))
}
const applyMiddleware = (...middlewares) => createStore => reducer => {
    const store = createStore(reducer)
    let { getState, dispatch } = store
    const params = {
        getState,
        dispatch: action => dispatch(action)
    }
    const middlewareArr = middlewares.map(middleware => middleware(params))
    console.log(middlewareArr.toString())
    dispatch = compose(...middlewareArr)(dispatch)
    return {
        ...store,
        dispatch
    }
}
const store = createStore(reducer, applyMiddleware(logger, thunk, logger2))
export default function () {
    return (
        <Provider store={store}>
            <TestApp title='this is title props'/>
        </Provider>
    )
}
