"use client"
import { redirect } from "next/navigation"

export function AuthProvider({
    children
} : {
    children : React.ReactNode
}){
    const token = localStorage.getItem("token")

    if(!token){
        redirect("/signin")
    }

    return (
        <>
        {children}
        </>
    )
}