import { z } from "zod";

export const CreateOrderSchema = z.object({
  totalPrice: z.number({ message: "Total Price is not provided" }),
  selectedSeatIds: z.array(z.number(), { message: "Seat array is empty" }),
  eventId: z.number({ message: "Event Id is not provided" }),
  receiptId: z.string({ message: "Receipt Id is not provided" })
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string({ message: "Order Id is Required" }),
  razorpay_payment_id: z.string({ message: "Payment Id is Required" }),
  razorpay_signature: z.string({ message: "Signature is Required" })
});
