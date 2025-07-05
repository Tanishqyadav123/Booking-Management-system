import { isVenueBusyType } from "../@types/comedian.types";
import { prisma } from "../lib/client";

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
      EventSeatDetails: true
    }
  });
