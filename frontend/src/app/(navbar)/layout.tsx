"use client"
import { Navbar } from "@/components/ui/navbar"
import { ThemeProvider } from "next-themes"

export function Layout({
    children
} : {
    children : React.ReactNode
}){
    return (
        <ThemeProvider attribute={"class"}>
            <Navbar />
            {children}
        </ThemeProvider>
    )
}