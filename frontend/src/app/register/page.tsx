"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { motion } from "motion/react"
import axios from "axios";
import { BACKEND_URL } from "@/config/lib";
import { useRouter } from "next/navigation";


export default function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');

    const router = useRouter()

    const handleRegister = async () => {
        if(!email || !password || !name){
            toast.error("Please Fill all the details")
            return
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/register`, {
                email,
                name,
                password
            })
            
            const data = response.data;
            localStorage.setItem("token", data.token)

            router.push("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <Toaster />
            <motion.div 
            initial={{y: 20, opacity : 0}}
            animate={{y : 0, opacity : 1}}
            transition={{duration : 0.3}}
            className="flex flex-col border border-border shadow-2xl rounded-md p-4 w-[40rem]">
                    <div className="text-4xl flex justify-center items-center w-full mb-4">
                        <h1>Register</h1>
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <Label>Email</Label>
                        <Input placeholder="Enter you'r email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <Label>Name</Label>
                        <Input placeholder="Enter you'r name" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        <Label>Password</Label>
                        <Input placeholder="Enter you'r password" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex w-full mb-2">
                        <Button variant={"default"} className="w-full cursor-pointer" onClick={handleRegister}>Register</Button>
                    </div>

                    <div className="text-gray-400 text-sm flex gap-4">
                        <p>Have an Account <Link href={"/signin"} className="text-gray-100 hover:text-gray-300">Signin</Link></p>
                    </div>
            </motion.div>
        </div>
    )
}