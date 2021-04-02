import React from 'react'
import { Button } from 'antd'
import GetRandomColor from './util'

function Count({ count: countT, add, minus, theme, changeTheme }) {
    return (
        <div
            style={{
                backgroundColor: theme,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10
            }}
        >
            <p>You clicked {countT} times</p>
            <Button onClick={add}>add</Button>
            <Button onClick={minus}>minus</Button>
            <Button onClick={changeTheme}>changeTheme</Button>
        </div>
    )
}

const countNumber = (initNumber) => (WrappedComponent) =>
    class CountNumber extends React.Component {
        state = { count: initNumber }

        // eslint-disable-next-line no-invalid-this
        add = () => this.setState({ count: this.state.count + 1 })

        // eslint-disable-next-line no-invalid-this
        minus = () => this.setState({ count: this.state.count - 1 })

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    count={this.state.count}
                    add={this.add}
                    minus={this.minus}
                />
            )
        }
    }

const changeTheme = (initColor) => (WrappedComponent) => {
    class ChangeTheme extends React.Component {
        state = {
            theme: initColor
        }
        changeTheme = () => this.setState({ theme: GetRandomColor() })

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    theme={this.state.theme}
                    changeTheme={this.changeTheme.bind(this)}
                />
            )
        }
    }

    // eslint-disable-next-line react/static-property-placement
    ChangeTheme.displayName = `changeTheme(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`
    return ChangeTheme
}

export default changeTheme('white')(countNumber(0)(Count))
