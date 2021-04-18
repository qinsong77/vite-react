type Actions = {
    type: string,
    payload?: any
}
export const createStore = (reducer: (state: any, action: Actions) => any, heightener?: (any) => any) => {
    // heightener是一个高阶函数,用于增强createStore
    //如果存在heightener,则执行增强后的createStore
    if(heightener) {
        return heightener(createStore)(reducer)
    }
    let currentState = {} // 公共状态
    const observers = []
    function getState() { // getter
        return currentState
    }
    
    function dispatch(action: Actions) { // setter
        currentState = reducer(currentState, action)
        observers.forEach(fn => fn())
    }
    
    function subscribe(fn) { // 发布订阅
        observers.push(fn)
    }
    dispatch({ type: '@@REDUX_INIT' })  //初始化store数据
    return {
        getState,
        dispatch,
        subscribe
    }
}
