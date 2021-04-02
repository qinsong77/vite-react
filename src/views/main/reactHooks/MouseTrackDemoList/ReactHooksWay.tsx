import React, { useState } from 'react'

function usePointer() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, any>) {
        setPosition({
            x: event.clientX,
            y: event.clientY
        })
    }

    return {
        position,
        handleMouseMove
    }
}

export default function ReactHooksWay() {
    const { position, handleMouseMove } = usePointer()
    return (
        <div onMouseMove={handleMouseMove} className='mouse-move-container'>
            <div>x: { position.x}, y: { position.y}</div>
        </div>
    )
}
