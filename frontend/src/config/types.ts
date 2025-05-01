


export interface MessageType {
    id : string
    text : string
    senderId : string
    timeStamp : Date
    status : "sent" | "pending" | "errored"
}