"use client"
import { Navbar } from "@/components/ui/navbar"
import { ThemeProvider } from "next-themes"

export default function Layout({
    children
} : {
    children : React.ReactNode
}){
    return (
        <main>
            <Navbar />
            {children}
            </main>
    )
}