import z from "zod";

export const addAReviewSchema = z.object({
     reviewerName : z.string().nonempty(),
     review : z.string().optional(),
     stars : z.string().nonempty({message :"Rating can not be left empty"}),
     showId : z.string().nonempty()
})