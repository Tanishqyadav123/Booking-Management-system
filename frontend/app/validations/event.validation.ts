import z from "zod";

export const addEventSchema = z.object({
    name : z.string().min(3 , {message : "Event Name must be atleast 3 characters"}),
    description : z.string().optional()
})