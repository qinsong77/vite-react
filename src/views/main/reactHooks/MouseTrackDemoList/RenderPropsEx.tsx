import React from 'react'
import { Button } from 'antd'
import GetRandomColor from './util'

export default function Example() {
    return (
        <ChangeTheme
            initColor='white'
            render={({ theme, changeTheme }) => (
                <div
                    style={{
                        backgroundColor: theme,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10
                    }}
                >
                    <CountNumber initNumber={0}>
                        {({ count, add, minus }) => (
                            <>
                                <p>You clicked {count} times</p>
                                <Button onClick={add}>add</Button>
                                <Button onClick={minus}>minus</Button>
                                <Button onClick={changeTheme}>change Theme</Button>
                            </>
                        )}
                    </CountNumber>
                </div>
            )}
        >
            <p>this is props children content</p>
        </ChangeTheme>
    )
}

class CountNumber extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    // eslint-disable-next-line no-invalid-this
    state = { count: this.props.initNumber }
    // eslint-disable-next-line no-invalid-this
    add = () => this.setState({ count: this.state.count + 1 })
    // eslint-disable-next-line no-invalid-this
    minus = () => this.setState({ count: this.state.count - 1 })

    render() {
        return this.props.children({
            count: this.state.count,
            add: this.add,
            minus: this.minus
        })
    }
}

class ChangeTheme extends React.Component {
    state = {
        theme: this.props.initColor
    }
    changeTheme = () => {
        this.setState({
            theme: GetRandomColor()
        })
    }
    render() {
        return (
            <div>
                {this.props.children}
                <p>this is props render content</p>
                {this.props.render({
                    theme: this.state.theme,
                    changeTheme: this.changeTheme
                })}
            </div>
        )
    }
}
