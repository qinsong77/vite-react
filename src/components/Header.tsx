import logo from '../assets/logo.svg'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function () {
	const history = useHistory()
	function loginOut () {
		sessionStorage.removeItem('auth')
		history.push('/login')
	}
	return (
		<>
			<img src={logo} className="container-logo" alt="logo" />
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/login" onClick={loginOut}>LoginOut</Link>
					</li>
					<li>
						<Link to="/main/user">main_user</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}
