import React from 'react'
import { initialState, ChatStore } from "~/src/views/chat/reducer/initialState"
export interface ChatContextValue {
    state: ChatStore,
    dispatch: React.Dispatch<any>
}
const ChatContext = React.createContext<ChatContextValue>({
    state: initialState,
    dispatch: value => {}
})
export default ChatContext
