import { MessageType } from "@/config/types";
import { ChatService } from "@/services/chat";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";



export interface CurrentRoomType {
    id : string
}


export interface ChatStoreType {
    currentRoom : CurrentRoomType | undefined
    setCurrentRoom : Dispatch<SetStateAction<CurrentRoomType | undefined>>
    messages : MessageType[]
    setMessages : Dispatch<SetStateAction<MessageType[]>>
}




export const ChatStore = createContext<ChatStoreType | null>(null);


export function ChatProvider({
    children
} : {
    children : React.ReactNode
}){
    const [currentRoom, setCurrentRoom] = useState<CurrentRoomType>();
    const [messages, setMessages] = useState<MessageType[]>([]);

    useEffect(() => {
        
        if(currentRoom?.id){
            const unsubscribe = ChatService.subscribeToMessage(currentRoom.id, setMessages);


            return () => unsubscribe();
        }

    }, [currentRoom])

    return <ChatStore.Provider value={{setMessages, setCurrentRoom, currentRoom, messages}}>
        {children}
    </ChatStore.Provider>
}



export const useChat = () => {
    const context = useContext(ChatStore);

    if(context === null){
        throw Error("Context Can't be null")
    }

    return context;
}