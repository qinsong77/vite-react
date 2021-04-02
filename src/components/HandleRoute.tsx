import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function HandleRoute(route) {
	if (route.redirect && !route.component) {
		return <Redirect exact from={route.path} to={route.redirect}/>
	} else if (route.auth) {
		const isAuthenticated = localStorage.getItem('Authorization')
		return <Route
			path={route.path}
			exact={route.exact}
			render={props =>
				isAuthenticated ? (
					<route.component  {...props} parentRoute={route}/>
				) : <Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>
			}
		/>
	} else {
		return  <Route
			path={route.path}
			exact={route.exact}
			render={props => (
				<route.component {...props} parentRoute={route}/>
			)}
		/>
	}
}

export default HandleRoute
