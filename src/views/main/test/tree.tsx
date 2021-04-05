import React, { useState} from 'react'

class App extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { val: 0 }
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
