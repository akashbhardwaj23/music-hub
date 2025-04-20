"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner"
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react"

export default function SignIn(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = async () => {
        if(!username || !password){
            toast.error("Please Enter all the details")
            return
        }

        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Toaster />
            <motion.div
            initial={{y : 20, opacity : 0}}
            animate={{y : 0, opacity : 1}}
            transition={{duration : 0.3}}
            className="flex flex-col border border-border shadow-2xl rounded-md p-4 w-[40rem]">
                    <div className="text-4xl flex justify-center items-center w-full mb-4">
                        <h1>Sign In</h1>
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <Label>Username</Label>
                        <Input placeholder="Enter you'r username" />
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        <Label>Password</Label>
                        <Input placeholder="Enter you'r username" />
                    </div>

                    <div className="flex w-full mb-2">
                        <Button variant={"default"} className="w-full cursor-pointer" onClick={handleSignIn}>Sign In</Button>
                    </div>

                    <div className="text-gray-400 flex text-sm gap-4">
                        <p>Don't have an Account <Link href={"/register"} className="text-gray-100 hover:text-gray-300">Register</Link></p>
                    </div>
            </motion.div>
        </div>
    )
}