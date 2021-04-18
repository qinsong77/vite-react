import React from 'react'
export const ReduxContext = React.createContext(null)
export function Provider(props) {
    return (
        <ReduxContext.Provider value={props.store}>
            { props.children }
        </ReduxContext.Provider>
    )
}
