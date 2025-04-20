import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";



export default function Register(){
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col border border-border shadow-2xl rounded-md p-4 w-[40rem]">
                    <div className="text-4xl flex justify-center items-center w-full mb-4">
                        <h1>Register</h1>
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <Label>Username</Label>
                        <Input placeholder="Enter you'r username" />
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <Label>Name</Label>
                        <Input placeholder="Enter you'r username" />
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        <Label>Password</Label>
                        <Input placeholder="Enter you'r username" />
                    </div>

                    <div className="flex w-full mb-2">
                        <Button variant={"default"} className="w-full">Sign In</Button>
                    </div>

                    <div className="text-gray-400 text-sm flex gap-4">
                        <p>Have an Account <Link href={"/signin"} className="text-gray-100 hover:text-gray-300">Signin</Link></p>
                    </div>
            </div>
        </div>
    )
}