import { prisma } from "../../../shared/src/lib/client";

export const isValidEventIdForBooking = async (eventId: number) =>
  await prisma.event.findUnique({
    where: {
      id: eventId,
      startTime: {
        gt: new Date().toISOString()
      }
    }
  });

// For Checking the seatIds provided belongs to event and are not booked yet :-
export const isValidSeatIds = async (seatId: number[], eventId: number) => {
  const allSeats = await prisma.singleEventSeat.findMany({
    where: {
      id: {
        in: seatId
      }
    },
    include: {
      eventSeatDetails: {
        include: {
          eventDetails: {
            select: {
              id: true
            }
          }
        }
      }
    }
  });

  allSeats.forEach((seatDetails) => {
    if (seatDetails.eventSeatDetails.eventDetails.id !== eventId || seatDetails.isBooked) {
      return false;
    }
  });

  return true;
};

// Check if the already not in temporary table and timer not expired yet  :-
export const isExistTemporaryTableAndNotExpired = async (seatId: number[]) => {
  const isExist = await prisma.temporaryLockSeats.findMany({
    where: {
      singleSeatId: {
        in: seatId
      },
      expiresAt: {
        gt: new Date().toISOString()
      }
    }
  });

  if (isExist && isExist.length > 0) {
    return true;
  }

  return false;
};

// Check if the seat is Already booked in bookedSeat Table :-
export const isExistInBookedSeats = async (seatIds: number[]) => {
  const isExist = await prisma.bookedSeat.findFirst({
    where: {
      singleSeatId: {
        in: seatIds
      }
    }
  });

  if (isExist) {
    return true;
  }

  return false;
};

// Check if bookingId is for this user Only :-
export const isYourBookingId = async (bookingId: number, userId: string) =>
  await prisma.booking.findUnique({
    where: {
      id: bookingId,
      userId
    }
  });
