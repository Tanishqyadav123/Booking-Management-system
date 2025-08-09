import axios from "axios";
import {
  CreateOrderResponseType,
  VerifyPaymentRequestType,
} from "../interfaces/booking.interface";

const token =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : "";

console.log("Token Up", token);
export const makeAnOrderService = async ({
  receiptId,
  selectedSeatIds,
  totalPrice,
  eventId,
}: {
  totalPrice: number;
  selectedSeatIds: number[];
  receiptId: string;
  eventId: number;
}) => {
  console.log("Token inside", token);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/booking/create-order`,
    {
      receiptId,
      selectedSeatIds,
      eventId,
      totalPrice,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);
  return res.data as CreateOrderResponseType;
};

export const verifyPaymentService = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: VerifyPaymentRequestType) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/booking/verify-payment`,
    {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Verification of payment response is here", res.data);

  return res.data as { message: string; success: boolean };
};
