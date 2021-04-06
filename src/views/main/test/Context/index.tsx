import React from 'react'
import { ThemeContext, themes } from './theme-context'
import ThemedButton from './themed-button'

type Props = {
	changeTheme: () => void
}

function Toolbar({ changeTheme }: Props) {
	return (
		<ThemedButton onClick={changeTheme}>
			Change Theme
		</ThemedButton>
	)
}

type State = {
	theme: {
		foreground: string,
		background: string
	}
}

class App extends React.Component {
	
	state: State = {
		theme: themes.light
	}
	
	constructor(props) {
		super(props)
	}
	
	toggleTheme = () => {
		this.setState(state => ({
			theme:
				state.theme === themes.dark
					? themes.light
					: themes.dark,
		}))
	}
	
	render() {
		// 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
		// 而外部的组件使用默认的 theme 值
		return (
			<div>
				<ThemeContext.Provider value={this.state.theme}>
					<Toolbar changeTheme={this.toggleTheme}/>
				</ThemeContext.Provider>
				<section>
					<ThemedButton/>
				</section>
			</div>
		)
	}
}

export default App
