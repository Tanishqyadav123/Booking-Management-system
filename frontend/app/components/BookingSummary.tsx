"use client";
import React, { useEffect } from "react";
import BookedSeats from "./BookedSeats";
import { useBookingContext } from "../Context/booking.context";
import LightButton from "./LightButton";
import toast from "react-hot-toast";
import {
  makeAnOrderService,
  verifyPaymentService,
} from "../Services/booking.service";
import { generateUniqueReceipt } from "../utils/generate.receipt";
import { useEventContext } from "../Context/event.context";
import { VerifyPaymentRequestType } from "../interfaces/booking.interface";
import { useAuth } from "../Context/auth.context";

function BookingSummary() {
  const {
    totalPrice,
    seatDetails,
    setSeatDetails,
    setTotalPrice,
    setIsBooked,
  } = useBookingContext();
  const { eventDetails } = useEventContext();
  const { userDetails, fetchUserDetails } = useAuth();
  // Loading the Script for razorPay :-
  const loadScript = (src: string) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        console.log("razorpay loaded successfully");
        resolve(true);
      };
      script.onerror = () => {
        console.log("error in loading razorpay");
        reject(false);
      };
      document.body.appendChild(script);
    });

  const handleBookTickets = async () => {
    if (!eventDetails?.id) {
      throw new Error("Event Id is not present");
    }
    const selectedSeatIds = seatDetails.map((seat) => seat.id);
    const receiptId = generateUniqueReceipt();

    try {
      const resData = await makeAnOrderService({
        receiptId,
        selectedSeatIds,
        totalPrice,
        eventId: eventDetails?.id,
      });

      if (resData.success) {
        toast.success(resData.message);
      }

      const isScriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!isScriptLoaded) {
        throw new Error("Can not load Script");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalPrice * 100, // Same amount as order creation
        currency: "INR",
        name: "Latent",
        description: "Payment",
        order_id: resData.data.orderId,
        handler: async function (response: VerifyPaymentRequestType) {
          // Handle successful payment, e.g., call your verify-payment API

          // Hit the API for Verify Payment :-
          const verifyPaymentRes = await verifyPaymentService({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyPaymentRes) {
            // Reset the State :-
            setSeatDetails([]);
            setTotalPrice(0);
            setIsBooked(true);
            toast.success("Hurray!!! Ticket is booked");
            // router.push("/payment-success")
          }
        },
        prefill: {
          name: `${userDetails?.firstName} ${userDetails?.lastName}`,
          email: userDetails?.email,
          contact: userDetails?.phoneNumber,
        },
        theme: {
          color: "#3399CC",
        },
      };

      console.log("Control Reached Here");
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("error is ", error);
      toast.error("Booking Seat Failed");
    }
  };

  // UseEffect to fetch user Details :-
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // useEffect(() => {
  //   if (eventDetails && eventDetails.id) {
  //     fetchEventDetailsById(eventDetails?.id.toString());
  //   }
  // }, [isBooked]);

  if (!userDetails) {
    return <>Loading....</>;
  }
  return (
    <div className="bg-black rounded-2xl w-[100%] min-h-32 p-4">
      <h2 className="text-lg font-bold">Booking Summary</h2>

      {seatDetails.length > 0 && (
        <div className="flex flex-col mt-5 text-xs text-gray-500 gap-3">
          {seatDetails.map((seatInfo) => {
            return (
              <BookedSeats
                seatNumber={seatInfo.seatNumber}
                currentId={seatInfo.id}
              />
            );
          })}
        </div>
      )}

      {/* <div className="sub-total flex items-center justify-between  mt-6 text-sm">
        <p>SubTotal</p>
        <p>$598.00</p>
      </div> */}
      <hr className="my-2" />
      <div className="flex items-center justify-between">
        <p>Total Revenue</p>
        <p className="flex items-center">Rs. {totalPrice}</p>
      </div>

      {totalPrice > 0 && (
        <div className="mt-4 flex items-center justify-center">
          <LightButton
            callback={() => handleBookTickets()}
            btnText={`Book Now`}
          />
        </div>
      )}
    </div>
  );
}

export default BookingSummary;
