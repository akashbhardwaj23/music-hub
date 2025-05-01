import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import env from "@/config/env"

const firebaseConfig = {
    apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGESENDERID,
  appId: env.APPID
}


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
