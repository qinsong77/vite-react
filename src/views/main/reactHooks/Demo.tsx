import React, { useState, useEffect, useRef } from 'react'
import { Slider, Button } from 'antd'
import Modal from '../../../components/Modal'
import anime from 'animejs'
import './demo.less'
interface Color {
    r: number
    g: number
    b: number
}

export default function App() {
    const [height, setHeight] = useState(10)
    const [width, setWidth] = useState(10)
    const [color, setColor] = useState<Color>({ r: 0, g: 0, b: 0 })
    const [radius, setRadius] = useState<number>(0)

    const style = {
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        borderRadius: `${radius}px`
    }

    const [anime01, setAnime01] = useState(false)
    const [anime02, setAnime02] = useState(false)
    const element = useRef<any>()

    useEffect(() => {
        anime01 && !anime02 && animate01()
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        anime02 && !anime01 && animate02()
    }, [anime01, anime02])

    function animate01() {
        if (element) {
            anime({
                targets: element.current,
                translateX: 400,
                backgroundColor: '#FF8F42',
                borderRadius: ['0%', '50%'],
                complete: () => {
                    setAnime01(false)
                }
            })
        }
    }

    function animate02() {
        if (element) {
            anime({
                targets: element.current,
                translateX: 0,
                backgroundColor: '#FFF',
                borderRadius: ['50%', '0%'],
                easing: 'easeInOutQuad',
                complete: () => {
                    setAnime02(false)
                }
            })
        }
    }

    function clickHandler() {
        setAnime01(true)
        setTimeout(setAnime02.bind(null, true), 500)
    }

    const [isOpen, setIsOpen] = useState(false)

    function onClose(msg: string) {
        console.log(msg)
        setIsOpen(false)
    }

    return (
        <div className='demo-container'>
            <Modal isOpen={isOpen} onClose={(msg) => onClose} title='Modal'>
                <p>this is content</p>
            </Modal>
            <Button onClick={() => setIsOpen(true)}>打开弹窗</Button>
            <p>height:</p>
            <Slider max={300} min={10} onChange={(n: number) => setHeight(n || 0)} />
            <p>width:</p>
            <Slider max={300} min={10} onChange={(n: number) => setWidth(n || 0)} />

            <p>color: R:</p>
            <Slider max={255} min={0} onChange={(n = 0) => setColor({ ...color, r: n })} />

            <p>color: G:</p>
            <Slider max={255} min={0} onChange={(n = 0) => setColor({ ...color, g: n })} />

            <p>color: B:</p>
            <Slider max={255} min={0} onChange={(n = 0) => setColor({ ...color, b: n })} />
            <p>Radius:</p>
            <Slider max={150} min={0} onChange={(n = 0) => setRadius(n)} />
            <div className='reatangle' style={style} />
            <div className='demo-container-sub' onClick={clickHandler}>
                <div className='el' ref={element} />
            </div>
        </div>
    )
}
