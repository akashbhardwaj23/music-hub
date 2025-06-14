


// export interface MessageType {
//     id : string
//     text : string
//     senderId : string
//     timeStamp : Date
//     status : "sent" | "pending" | "errored"
// }



export type Message = {
    id: number
    text: string
    sender: string
    timestamp: number
    status?: "sending" | "sent" | "delivered" | "read"
    reactions?: string[]
    attachments?: {
      type: "image" | "audio" | "video" | "file"
      url: string
      name: string
    }[]
  }

  export type MessageFirestore = {
    id: number
    text: string
    sender: string
    timestamp: object | number
    status?: "sending" | "sent" | "delivered" | "read"
    reactions?: string[]
    attachments?: {
      type: "image" | "audio" | "video" | "file"
      url: string
      name: string
    }[]
  }

  
export type TrackType = {
  id : string,
  songName : string,
  favorite : boolean,
  songurl : string,
  songImg : string,
  songDesccription : string
}

