"use client"

import { Navbar } from "@/components/ui/navbar"
import { AuthProvider } from "@/components/provider/authprovider"

export default function Layout({
    children
} : {
    children : React.ReactNode
}){

    return (
        <AuthProvider>
            <main>
            <Navbar />
            {children}
            </main>
        </AuthProvider>
    )
}