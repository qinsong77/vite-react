import React, { useState } from 'react'

function Test() {
    const [state, setSate] = useState(0)
    return (
        <div>
            <h2>Parent</h2>
            <p>{state}</p>
            <Button add={() => setSate(state + 1)} />
        </div>
    )
}

function Button(props) {
    return <button onClick={(e) => props.add()}>add</button>
}

// 4种绑定this

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            title: ' react study'
        }
        this.handleClick2 = this.handleClick1.bind(this);
    }

    componentDidMount() {
        document.getElementById('btn-test5').addEventListener('click', this.handleClick2, false)
        console.log('componentDidMount: ', this.state.num)
    }

    handleClick1() {
        this.setState({
            num: this.state.num + 1
        })
        console.log(this.state.num)
    }

    handleClick3 = () => {
        this.setState(
            {
                num: this.state.num + 1
            },
            () => {
                // 这里打印的是最新的state值
                console.log(this.state.num);
            }
        );
    };

    render() {
        return (
            <div>
                <h2>Ann, {this.state.num}</h2>
                <button onClick={this.handleClick2}>btn1</button>
                <button onClick={this.handleClick1.bind(this)}>btn2</button>
                <button onClick={() => this.handleClick1()}>btn3</button>
                <button onClick={this.handleClick3}>btn4</button>
                <button onClick={this.handleClick3}>btn4</button>
                <button id="btn-test5">btn5</button>
            </div>
        )
    }
}

export default App
