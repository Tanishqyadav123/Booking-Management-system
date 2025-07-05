import { z } from "zod";

const createEventSeatSchema = z.object({
  seatId: z.string().nonempty(),
  seatCount: z.string().nonempty(),
  price: z.string().nonempty()
});
export const createNewEventSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  startTime: z.string().nonempty(),
  endTime: z.string().nonempty(),
  entireVenue: z.enum(["true", "false"]),
  venueId: z.string().nonempty(),
  eventSeats: z.array(createEventSeatSchema).optional()
});

const seatPriceSeat = z.object({
  eventSeatId: z.number().positive(),
  price: z.number().positive()
});
export const updateEventSeatPriceSchema = z.object({
  seatDetails: z.array(seatPriceSeat).nonempty()
});
