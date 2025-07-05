import {z} from 'zod';
export const SignUpSchema = z.object({
    firstName : z.string().nonempty().min(3 , {message : "First Name must be atleast 3 characters"}),
    lastName : z.string().nonempty().min(3 , {message : "Last Name must be atleast 3 characters"}),
    email : z.string().nonempty(),
    phoneNumber : z.string().nonempty(),
    password : z.string().min(8 , {message : "Password must be atleast 8 character long"})
})

export const SignInSchema = z.object({

    email : z.string().nonempty(),
    password : z.string().nonempty(),
    isAdmin : z.boolean()
})
export const sendOtpSchema = z.object({
    phoneNumber : z.string().nonempty().min(10)
})

export const verifyOtpSchema = z.object({
    otp : z.string().length(4)
})