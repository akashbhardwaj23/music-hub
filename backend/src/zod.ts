import {z} from "zod"

export const SignInInputs = z.object({
    email : z.string().email(),
})