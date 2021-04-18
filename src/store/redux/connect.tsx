import React, { useContext, useEffect, useRef, useState } from 'react'
import { ReduxContext } from '@src/store/redux/Provider'

export function connect(mapStateToProps, mapDispatchToProps) {
    /** old
    return function (Component) {
        return function Connect(props) {
            console.log(props)
            const [state, setState ] = useState({})
            const refs = useRef(null)
            useEffect(()=> {
                if(refs.current) {
                    setState(refs.current.getState)
                    refs.current.subscribe(() => {
                        // 根据mapStateToProps把state挂到this.props上
                        setState(mapStateToProps(refs.current.getState()))
                    })
                }
            }, [])
            return (
                <ReduxContext.Consumer>
                    {
                        value => {
                            refs.current = value
                            return (
                                <Component
                                    { ...props }
                                    { ...state }
                                    // 根据mapDispatchToProps把dispatch(action)挂到this.props上
                                    { ...mapDispatchToProps(value.dispatch) }
                                />
                            )
                        }
                    }
                </ReduxContext.Consumer>
            )
        }
    }
     **/
    return function (Component) {
        return function Connect(props) {
            const store = useContext(ReduxContext)
            console.log(store)
            const [state, setState ] = useState(store.getState())
            useEffect(()=> {
                console.log('useEffect running')
                store.subscribe(() => {
                    // 根据mapStateToProps把state挂到this.props上
                    setState(mapStateToProps(store.getState()))
                })
            }, [])
            return (
                <Component
                    { ...props }
                    { ...state }
                    //{ ...mapStateToProps(store.getState()) }
                    // 根据mapDispatchToProps把dispatch(action)挂到this.props上
                    { ...mapDispatchToProps(store.dispatch) }
                />
            )
        }
    }
    
}
