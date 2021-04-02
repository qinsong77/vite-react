import React,{ Suspense } from 'react'
import 'normalize.css'
import './styles/common.less'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './router'
import HandleRoute from './components/HandleRoute'
import NotFound from './views/error/NotFound'
import Loading from './components/Loading'

window.publicPath = 'http://localhost:3000'

function App () {
	return (
		<Router>
			<Suspense fallback={<Loading/>}>
				<Switch>
					{routes.map ((route, i) => <HandleRoute key={i} {...route} />)}
					<Route path="*">
						<NotFound/>
					</Route>
				</Switch>
			</Suspense>
		</Router>
	)
}

export default App
