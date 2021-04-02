import React from 'react'

interface Props {
    render: (props: { x: number, y: number }) => React.ReactNode
}

class Mouse extends React.Component<Props>{
    state = {
        x: 0,
        y: 0
    }

    handleMouseMove = (event: React.MouseEvent<HTMLDivElement, any>) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render() {
        return (
            <div onMouseMove={this.handleMouseMove} className='mouse-move-container'>
                {this.props.render(this.state)}
            </div>
        )
    }
}

export default function () {
    return (
        <Mouse render={
            ({x, y}) => (
                <div>x: {x}, y: {y}</div>
            )
        }/>
    )
}
