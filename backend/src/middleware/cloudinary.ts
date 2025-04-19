import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import path from "path"
import axios from "axios"




cloudinary.config({
    api_key : process.env.CLOUDINARY_API_KEY,
    cloud_name : "mycloudfile",
    api_secret : process.env.CLOUDINARY_SECRET
})



// async function uploadSong(filePath : string) {
//     try {
//       const result = await cloudinary.uploader.upload(filePath, {
//         resource_type: "raw", 
//       });
  
//       console.log(`Uploaded ${filePath} successfully:`, result);
//       return result; // Return the upload result
//     } catch (error) {
//       console.error(`Error uploading ${filePath}:`, error);
//       throw error; // Re-throw the error to be handled by the caller
//     }
//   }

// export async function Cloudinary(){
//     console.log(path.join(__dirname , "../../songs"))
    

//     const songsDir = path.join(__dirname, "../../songs");

//     console.log(songsDir)

//     const fileNames = fs.readdirSync(songsDir)

//     // console.log(fileNames[0])


//     console.log(process.env.CLOUDINARY_API_KEY)
//     for(let i = 0; i < fileNames.length; i++){
//         const filePath = path.join(songsDir, fileNames[i])
//         try {
           
//             const res = await uploadSong(filePath)
//         } catch (error) {
//             console.log("error while uploading ", error)
//         }
//     }
// }

// Cloudinary()




export async function getSongUrl(){
  try {
    const response = await axios.get("https://res.cloudinary.com/mycloudfile/video/upload/v1745090562/Millionaire_Glory_320_Kbps_ay4mwg.mp3")
  } catch (error) {
    
  }
}