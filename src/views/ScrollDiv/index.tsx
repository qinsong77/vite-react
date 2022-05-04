import React, {useEffect} from "react";

export function throttle(fn: Function, wait: number) {
  let previous = 0
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (...args) => {
    const now = Number(new Date())
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // @ts-ignore
    const context = this
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

type Iprops = {
  style: React.CSSProperties,
  scrollTop: number,
  isInEditor: boolean
}
// @ts-ignore
const TestDiv: React.FC<Iprops> = ({style, scrollTop, isInEditor=false}) => {

  const [finalStyle, setFinalStyle] = React.useState<React.CSSProperties>((): React.CSSProperties => {
    if (isInEditor) return style
    const res: React.CSSProperties = {
      ...style,
      zIndex: 9999,
      position: 'fixed',
      display: scrollTop === 0 ? 'block' : 'none',
      bottom: 0,
      left: 0,
      right: 0,
    }
    delete res.top
    return res
  })
  const ref = React.useRef(finalStyle);
  useEffect(() => {
    ref.current = finalStyle;
  })
  console.log(ref)
  React.useEffect(() => {
    const rootNode = document.querySelector('#test11') as HTMLElement
    console.log(rootNode);
    function handleScroll(event: any) {
      console.log(ref.current);
      // 滚动的高度
      const eleScrollTop = (event.srcElement ? event.srcElement.scrollTop : false) || event.target.scrollTop
      console.log(eleScrollTop);
      if (eleScrollTop > scrollTop) {
        if (ref.current.display !== 'none') return;
        console.log(134);
        setFinalStyle({
          ...ref.current,
          position: 'fixed',
          display: 'block',
          bottom: 0,
        })
      } else if (ref.current.display !== 'none') {
        setFinalStyle({
          ...ref.current,
          display: 'none',
        })
      }
    }

    const ThrottleFun = throttle(handleScroll, 100)
    if (!isInEditor && rootNode) {
      rootNode.addEventListener('scroll', ThrottleFun)
    }
    return () => {
      !isInEditor && rootNode.removeEventListener('scroll', ThrottleFun)
    }
  }, [])
  return <div style={finalStyle}>123</div>
}

export default function () {
  const [style, setStyle] = React.useState<React.CSSProperties>({
    top: 0,
    position: 'absolute',
    background: 'red',
    width: '100%',
    height: 200
  })
  return <div id='test111'>
    <div style={{background: '#334', height: 3000}}>123</div>
    <TestDiv style={style} scrollTop={10} isInEditor={false}/>
  </div>
}
