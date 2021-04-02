import React, {Component} from 'react';

export default class Parent extends Component {

    onRef = (ref) => {
        this.child = ref
    }

    click = () => {
        this.child.myName()
    }

    render() {
        return (
            <div>
                <Child onRef={this.onRef}/>
                <button onClick={this.click}>click</button>
            </div>
        )
    }
}

class Child extends Component {
    componentDidMount() {
        this.props.onRef(this)
    }

    myName = () => console.log('child log')

    render() {
        return (
            <p>child</p>
        )
    }
}
