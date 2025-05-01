import {z} from "zod"
import tryParseEnv from "./try-parse-env"



const env = z.object({
  APIKEY: z.string(),
  AUTHDOMAIN: z.string(),
  PROJECTID: z.string(),
  STORAGEBUCKET: z.string(),
  MESSAGESENDERID: z.string(),
  APPID: z.string()
})


export type ENVSCHEMA = z.infer<typeof env>

tryParseEnv(env);

export default env.parse(process.env)