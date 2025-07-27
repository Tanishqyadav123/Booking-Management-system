import z from "zod";

export const eventSeatSchema = z.object({
  seatId: z.string(),
  seatCount: z.string(),
  price: z.string(),
});

export const addEventSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Event Name must be atleast 3 characters" }),
  description: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  entireVenue: z.enum(["true", "false"]),
  venueId: z.string(),
  eventSeats: z.array(eventSeatSchema),
});
