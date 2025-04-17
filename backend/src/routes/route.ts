import { Router, type Request, type Response } from "express";
import { SignInInputs } from "../zod";
import { prisma } from "../db/db";
import jwt from "jsonwebtoken"

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
        const user = await prisma.user.create({
            data : {
                email : success.data!.email
            }
        })

        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET!)

        res.json({
            token
        })
    } catch (error) {
        res.status(403).json({
            message : "Email Already Present"
        })
    }
    
})


router.get("/songs", async (req : Request , res : Response) => {
    const songs = await prisma.songs.findMany();

    res.json({
        songs
    })
})


export default router;