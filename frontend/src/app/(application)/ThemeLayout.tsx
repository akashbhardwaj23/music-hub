"use client"
import { Navbar } from "@/components/ui/navbar"
import { ThemeProvider } from "next-themes"

export function ThemeLayout({
    children
} : {
    children : React.ReactNode
}){
    return (
        <ThemeProvider attribute={"class"}>
            {children}
        </ThemeProvider>
    )
}