import { z } from "zod";

export const addNewReviewSchema = z.object({
  review: z.string().optional(),
  rating: z.number().nonnegative(),
  eventId: z.number().nonnegative()
});
