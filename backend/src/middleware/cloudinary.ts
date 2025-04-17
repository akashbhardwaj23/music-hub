import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import path from "path"




cloudinary.config({
    api_key : process.env.CLOUDINARY_API_KEY,
    cloud_name : "mycloudfile",
    api_secret : process.env.CLOUDINARY_SECRET
})


export async function Cloudinary(){
    console.log(path.join(__dirname  + "../../../songs"))
    const fileNames = fs.readdirSync(path.join(__dirname + "../../../songs"))

    console.log(fileNames[0])

    for(let i = 0; i < fileNames.length; i++){
        await cloudinary.uploader.upload(`songs\\${fileNames[i]}`, {
            resource_type : "video",
            public_id : 'songs'
        })
    }
}

Cloudinary()