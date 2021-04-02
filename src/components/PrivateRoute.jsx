import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute ({ children, ...rest }) {
	let isAuthenticated = localStorage.getItem('Authorization')
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	)
}

export default PrivateRoute
