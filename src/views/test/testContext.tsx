import React, { useState, useContext, useRef } from 'react'
import { themes, ThemeContext } from './context'

function TestContext () {
	const [theme, setTheme] = useState (themes.light)
	return <ThemeContext.Provider value={{
		theme,
		toggle: () => setTheme (theme => theme === themes.light ? themes.dark : themes.light)
	}}>
		<Toolbar/>
	</ThemeContext.Provider>
}

function Toolbar () {
	const inputRef = useRef(null)
	return <div>
		<p>context toolbar</p>
		<input ref={inputRef}/>
		<div>
			<button onClick={() => inputRef.current.focus()}>focus</button>
		</div>
		<ThemedButton/>
	</div>
}

function ThemedButton () {
	const context = useContext (ThemeContext)
	return (
		<button
			onClick={() => context.toggle()}
			style={{ background: context.theme.background, color: context.theme.foreground }}>
			I am styled by theme context!
		</button>
	)
}

export default TestContext

