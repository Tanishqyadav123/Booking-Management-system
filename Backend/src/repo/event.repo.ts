import { isVenueBusyType } from "../@types/comedian.types";
import { prisma } from "../lib/client";
import { SingleEventSeatType } from "../@types/event.types";

export const getAllMyEventsService = async ({ comedianId }: { comedianId: string }) =>
  await prisma.event.findMany({
    where: {
      comedianId
    }
  });

export const isVenueBookForThatTimeService = async ({ venueId, end, start }: isVenueBusyType) =>
  await prisma.event.findFirst({
    where: {
      venueId,
      startTime: {
        lt: end
      },
      endTime: {
        gt: start
      }
    }
  });

// Get Event Details by Id :-
export const getEventDetailByIdService = async (eventId: number) =>
  await prisma.event.findUnique({
    where: {
      id: eventId
    },
    include: {
      EventSeatDetails: {
        include: {
          seatDetails: true
        }
      },
      venueDetails: {
        select: {
          name: true,
          address: true
        }
      }
    }
  });

export const getEventDetailsWithSingleSeats = async (eventId: number) => {
  const eventDetail = await prisma.event.findUnique({
    where: {
      id: eventId
    },
    include: {
      EventSeatDetails: {
        include: {
          seatDetails: {
            select: {
              seatName: true
            }
          }
        }
      },
      venueDetails: {
        select: {
          name: true,
          address: true,
          locationId: true
        }
      }
    }
  });

  const eventDetailsUpdated = { ...eventDetail };
  const arr = eventDetailsUpdated.EventSeatDetails?.map((seatInfo) => {
    const seat = JSON.parse(JSON.stringify(seatInfo));
    seat.seatName = seatInfo.seatDetails.seatName;
    delete seat.seatDetails;

    return seat;
  });

  if (arr?.length) {
    eventDetailsUpdated.EventSeatDetails = [...arr];
  }

  // All Event Seats Id :-
  const eventSeatIds = eventDetailsUpdated.EventSeatDetails && eventDetailsUpdated?.EventSeatDetails.map((es) => es.id);

  // Fetch all the single Seat Instance :-
  let allSingleSeats: SingleEventSeatType[] = [];
  if (eventSeatIds?.length) {
    allSingleSeats = await prisma.singleEventSeat.findMany({
      where: {
        eventSeatId: {
          in: eventSeatIds
        }
      }
    });
  }

  const order: { V: number; M: number; F: number } = { V: 3, M: 2, F: 1 };
  allSingleSeats.sort((a, b) => {
    const typeA = a.seatNumber[0] as "V" | "M" | "F";
    const typeB = b.seatNumber[0] as "V" | "M" | "F";

    // Sort by type first (V > M > F)
    if (order[typeA] !== +order[typeB]) {
      return order[typeB] - order[typeA];
    }

    // Extract numbers and sort in descending order
    const numA = parseInt(a.seatNumber.slice(1), 10);
    const numB = parseInt(b.seatNumber.slice(1), 10);

    return numB - numA;
  });

  /// Attach all single Event Seats Field :-
  return { ...eventDetailsUpdated, allSingleSeats };
};
