"use client"
import { redirect } from "next/navigation"

export function AuthProvider({
    children
} : {
    children : React.ReactNode
}){

    if(window === undefined){
        return
    }
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