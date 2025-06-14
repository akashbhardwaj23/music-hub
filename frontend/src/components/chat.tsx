"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Smile, Paperclip, Mic } from "lucide-react"
import { emojis } from "@/lib/emojis"
import { useChat } from "@/context/provider/chatprovider"
import { ChatService } from "@/services/chat"
import { serverTimestamp } from "firebase/database"
import { Message } from "@/config/types"

type MessageFirestore = {
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

export default function ChatComponent() {
  const {messages, setMessages} = useChat()

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const userId = localStorage.getItem("userId")!


  // console.log("messages ", messages)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim() === "") return

    const userMessage: MessageFirestore = {
      id: Date.now(),
      text: newMessage,
      sender: userId,
      timestamp: serverTimestamp(),
      status: "sending",
    }

    // setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setShowEmojiPicker(false)
    setIsTyping(true)

    ChatService.sendMessage('1', '1', userMessage)

    setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? {...msg, status : "sent"} : msg)))
  }

  const getRandomResponse = () => {
    const responses = [
      "I can recommend more tracks in this style. Would you like me to create a playlist?",
      "If you enjoy this track, you might also like 'Static Whispers' by Mono Type.",
      "How's the audio quality? I can adjust the equalizer settings if needed.",
      "This track has a 60 BPM tempo, perfect for maintaining focus without distraction.",
      "Would you like me to set a timer to fade out the music after a certain period?",
      "I notice you've been coding for a while. Would you like me to suggest a short break with a different track?",
      "The artist has a new album coming out next week. Would you like me to notify you when it's released?",
      "This track uses binaural beats to enhance concentration. Is it helping with your focus?",
      "I can dim the interface if you'd prefer fewer visual distractions while you work.",
      "Would you like me to automatically queue similar tracks when this one ends?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case "sending":
        return <span className="text-muted-foreground">Sending</span>
      case "sent":
        return <span className="text-muted-foreground">Sent</span>
      case "delivered":
        return <span className="text-[var(--muted-foreground)]">Delivered</span>
      case "read":
        return <span className="text-[var(--primary)]/70">Read</span>
      default:
        return null
    }
  }

  return (
    <div className="h-full border border-border bg-card shadow-sm rounded-md">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full flex items-center justify-center">
                <Bot className="size-4" />
              </div>

              <div>
                <h2 className="text-base font-medium text-foreground">Music Assistant</h2>
                <p className="text-xs text-[var(--muted-foreground)]">Online</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              {messages.length > 0 && (<div className="bg-muted/30 text-muted-foreground text-xs px-3 py-1">
                {formatDate(new Date(messages[0].timestamp))}
              </div>)}
            </div>

            <AnimatePresence initial={false}>
              {messages && messages.map((message, index) => {
                const showDateSeparator =
                  index > 0 && formatDate(new Date(message.timestamp)) !== formatDate(new Date(messages[index - 1].timestamp))

                return (
                  <div key={message.id}>
                    {showDateSeparator && (
                      <div className="flex items-center justify-center my-4">
                        <div className="bg-[var(--muted)]/30 text-[var(--muted-foreground)] text-xs px-3 py-1">
                          {formatDate(new Date(message.timestamp))}
                        </div>
                      </div>
                    )} 

                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.sender === userId ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${message.sender === userId  && "flex-row-reverse"}`}
                      >
                        {message.sender !== userId && (
                          <div className="size-8 bg-primary text-primary-foreground px-2 rounded-full flex items-center justify-center">
                            <Bot className="size-4" />
                          </div>
                        )}

                        <div className="space-y-1">
                          <div
                            className={`text-center px-4 py-3 rounded-lg ${
                              message.sender === userId
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground border border-border"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>

                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, i) => (
                                  <div
                                    key={i}
                                    className="p-2 bg-background/50 border border-border flex items-center gap-2"
                                  >
                                    <span className="text-xs truncate">{attachment.name}</span>

                                    <button className="h-6 px-2 ml-auto text-xs bg-transparent hover:bg-accent/50 rounded-md">
                                      Play
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div
                            className={`flex items-center text-xs ${
                              message.sender === userId ? "justify-end" : "justify-start"
                            }`}
                          >
                            <span className="text-muted-foreground">{formatTime(new Date(message.timestamp))}</span>

                            {message.sender === userId && message.status && (
                              <span className="ml-2">{renderStatus(message.status)}</span>
                            )}
                          </div>

                          {message.reactions && message.reactions.length > 0 && (
                            <div className={`flex ${message.sender === userId ? "justify-end" : "justify-start"}`}>
                              <div className="flex -space-x-1 bg-muted/30 px-2 py-0.5 border border-border">
                                {message.reactions.map((reaction, i) => (
                                  <div key={i} className="text-sm">
                                    {reaction}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {message.sender === userId && (
                          <div className="size-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center">
                            <User className="size-4" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </AnimatePresence>
{/* 
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="flex gap-3">
                  <div className="size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <Bot className="size-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="bg-secondary text-secondary-foreground px-4 py-3 border border-border">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          className="size-2 rounded-full bg-primary"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 0.2,
                          }}
                          className="size-2 rounded-full bg-primary"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 0.4,
                          }}
                          className="size-2 rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )} */}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-center size-10 text-muted-foreground hover:text-forground hover:bg-accent/50 rounded-md"
              >
                <Paperclip size={18} />
              </button>

              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-muted/30 border border-border text-forground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50 outline-none px-3 py-2 rounded-md"
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="flex items-center justify-center size-10 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/50 rounded-md"
                >
                  <Smile size={18} />
                </button>

                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 w-80 p-4 bg-card border border-border rounded-md shadow-md">
                    <div className="grid grid-cols-8 gap-1">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          className="p-1.5 text-xl hover:bg-accent/50 transition-colors rounded-md"
                          onClick={() => handleEmojiSelect(emoji)}
                          type="button"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="flex items-center justify-center size-10 text-muted-foreground hover:text-forground hover:bg-accent/50 rounded-md"
              >
                <Mic size={18} />
              </button>

              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer px-4 py-2 rounded-md flex items-center dark:bg-blue-600 dark:text-white"
              >
                <Send size={16} className="mr-2" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

