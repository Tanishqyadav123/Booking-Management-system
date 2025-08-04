export interface CreateOrderResponseType {
  success: boolean;
  message: string;
  data: {
    orderId: string;
  };
}

export interface VerifyPaymentRequestType {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
