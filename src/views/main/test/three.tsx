import React from 'react'

type State = {
	val: number
}

class App extends React.Component {

	state: State = {
		val: 0
	}

	constructor(props) {
		super(props)
	}

	increment = () => {
		this.setState({ val: this.state.val + 1 })
		console.log(this.state.val) // 输出的是更新前的val --> 0
	}
	render() {
		return (
			<div onClick={this.increment}>
				{`Counter is: ${this.state.val}`}
			</div>
		)
	}
}


export default App
