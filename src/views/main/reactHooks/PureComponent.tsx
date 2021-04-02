import React from 'react'

class App extends React.Component {
    constructor(props) {
        super()
        this.state = {
            date: new Date()
        }
        this.interval = null
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000)
    }

    componentWillUnmount() {
        this.interval && clearInterval(this.interval)
    }

    render() {
        return (
            <div>
                <Child seconds={12} />
                <div>{this.state.date.toString()}</div>
            </div>
        )
    }
}

console.log(App)

class Child extends React.PureComponent {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    // 	return nextProps.seconds !== this.props.seconds
    // }

    render() {
        console.log('I am rendering')
        return <div>I am update every {this.props.seconds} seconds</div>
    }
}

export default App
