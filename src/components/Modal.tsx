import ReactDom from 'react-dom'
import React, { useEffect } from 'react'

interface Props {
    title: string
    isOpen: boolean
    message?: string
    children?: React.PropsWithChildren<any>
    onClose: (msg: string) => any
}

function hasScrollbar() {
    return (
        document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    )
}

const MaskStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
} as React.CSSProperties

const ContentStyle = {
    position: 'absolute',
    top: 200,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1001,
    height: 300,
    width: 500,
    backgroundColor: 'white'
} as React.CSSProperties

function Modal({ message, isOpen, onClose, children }: Props) {
    if (!isOpen) return null
    if (hasScrollbar()) {
        document.body.style.width = 'calc(100% - 17px)'
    }
    document.body.style.overflow = 'hidden'
    useEffect(() => {
        return function () {
            document.body.style.removeProperty('overflow')
            document.body.style.removeProperty('width')
        }
    })
    return ReactDom.createPortal(
        <div className='modal-mask' style={MaskStyle}>
            <div className='modal-content' style={ContentStyle}>
                {message ? message : children}
                <button onClick={() => onClose('click close')}>Close</button>
            </div>
        </div>,
        document.body
    )
}

export default Modal
