import React from 'react'


interface Props {
    x: number,
    y: number
}

const WithMouse =(Component: React.ComponentType<Props>) => {
    return class extends React.Component<any, any> {
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

        render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
            return (
                <div onMouseMove={this.handleMouseMove} className='mouse-move-container'>
                    <Component {...this.props} { ...this.state}/>
                </div>
            )
        }
    }
}



export default WithMouse(({ x, y }) => {
    return (
        <div style={{ height: '100%' }}>
            <div>x: {x}, y: {y}</div>
        </div>
    )
})
