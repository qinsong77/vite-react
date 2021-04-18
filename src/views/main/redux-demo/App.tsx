import React from 'react'
import { connect } from '@src/store/redux/connect'
import { Divider } from 'antd'

const addCountAction = {
    type: 'add'
}

const mapStateToProps = state => {
    return {
        count: state.count
    }
}

function addCountActionAsync(dispatch) {
    setTimeout(() => {
        dispatch({ type: 'add' })
    }, 1000)
}

const mapDispatchToProps = dispatch => {
    return {
        addCount: () => {
            dispatch(addCountAction)
        },
        addCountAsync: () => {
            setTimeout(() => {
                dispatch(addCountActionAsync)
            }, 1000)
        }
    }
}

function App(props) {
    return (
        <div>
            <p>{ props.title }</p>
            <p>count: { props.count }</p>
            <Divider/>
            <button onClick={() => props.addCount()}>add</button>
            <Divider/>
            <button onClick={() => props.addCountAsync()}>addCountAsync</button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
