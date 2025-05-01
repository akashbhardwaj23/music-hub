import { limitToLast, onValue, push, query, ref } from "firebase/database";
import { db } from "./firebase";
import { MessageType } from "@/config/types";




export class ChatService {
    static async sendMessage(roomId : string, userId : string, message : string){
        const messageRef = ref(db, `chats/${roomId}/messages`);

        return push(messageRef, {
            text : message,
            senderId : userId,
            timeStamp : Date.now(),
            status : "sent"
        })
    }

    static subscribeToMessage(roomId : string, callback : (message : MessageType[]) => void){
        const messageRef = ref(db, `chats/${roomId}/messages`);
        const recentMessage = query(messageRef, limitToLast(50));
        return onValue(recentMessage, (snapshot) => {
            const messages:MessageType[] = [];
            snapshot.forEach((m) => {
                messages.push({id : m.key, ...m.val()})
            })

            callback(messages)
        })
    }
}