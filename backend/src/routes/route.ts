import { Router, type Request, type Response } from "express";
import { SignInInputs, SignUpInputs } from "../zod";
import { prisma } from "../db/db";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { songs } from "../lib/utils";

const router = Router();



router.post("/login", async (req : Request, res : Response) => {
    const success = SignInInputs.safeParse(req.body);

    if(!success.success){
        res.status(403).json({
            message : "Inputs are Incorrect"
        })
        return
    }
    

    try {
        
        const user = await prisma.user.findFirst({
            where : {
                email : success.data!.email
            }
        })

        if(!user){
            res.status(403).json({
                message : "User is Not Present"
            })
            return
        }


        const correctPassword = await bcryptjs.compare(success.data.password, user.passsword)

        if(!correctPassword){
            res.status(403).json({
                message : "Password is Incorrect"
            })
            return
        }

        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET!)

        res.json({
            userId : user.id,
            token
        })
    } catch (error) {
        res.status(403).json({
            message : "Email Already Present"
        })
    }
    
})



router.post("/register", async (req: Request , res : Response) => {
    const body = req.body


    const success = SignUpInputs.safeParse(body);

    if(!success.success){
        res.status(403).json({
            message : "Inputs are not correct"
        })
        return
    }

    const hashedPassword = await bcryptjs.hash(success.data.password, 8)

    try {
        const user = await prisma.user.create({
            data : {
                email : success.data.email,
                name : success.data.name,
                passsword : hashedPassword
            }
        })

        const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET!)

        res.json({
            userId : user.id,
            token
        })

    } catch (error) {
        console.log("Error user Present")
        res.status(403).json({
            message : "User Already Present"
        })
    }

})


router.get("/songs", async (req : Request , res : Response) => {
    const songs = await prisma.songs.findMany();

    console.log("songs are ", songs)
    res.json({
        songs
    })
})


router.post("/addSong", async (req : Request, res : Response) => {
    
})


export default router;