import React from 'react'
import initialState from "~/src/views/chat/reducer/initialState"
const ChatContext = React.createContext(initialState)
export default ChatContext
