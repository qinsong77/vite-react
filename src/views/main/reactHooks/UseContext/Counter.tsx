import React, { useContext } from 'react';
import { Button } from 'antd';
import { context, CounterProvider } from './ContextProvider';

function Counter() {
    const { counter = 0, increment, decrement } = useContext(context);

    return (
        <div style={{ width: '400px'}}>
            <h3>第一层组件</h3>
            <div style={{ width: '40px', margin: '100px auto', fontSize: '40px' }}>{counter}</div>
            <Button onClick={increment}>递增</Button>
            <Button onClick={decrement}>递减</Button>
            <TwoChild/>
            <MemoTwoChild/>
        </div>
    );
}

function TwoChild() {
    console.log('render')
    return (
        <div>
            <h2>第二层组件</h2>
            <p>hello</p>
            <ThirdChild/>
        </div>
    )
}

const MemoTwoChild = React.memo(TwoChild) // context变化时，不会打印render

function ThirdChild() {
    const { counter = 0, increment, decrement } = useContext(context);
    
    return (
        <div style={{ width: '200px', margin: 'auto' }}>
            <h3>第三层组件</h3>
            <div style={{ width: '40px', margin: '100px auto', fontSize: '40px' }}>{counter}</div>
            <Button onClick={increment}>递增</Button>
            <Button onClick={decrement}>递减</Button>
        </div>
    );
}

export default () => <CounterProvider><Counter /></CounterProvider>;
