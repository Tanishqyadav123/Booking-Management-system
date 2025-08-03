import { EventFilterType } from "../@types/viewer.types";
import { prisma } from "../lib/client";

export const getAllLatestEvents = async ({ ename, comedianId, venueId, locationId }: EventFilterType) => {
  const currentTime = new Date().toISOString();

  let allEvents = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      startTime: {
        gt: currentTime
      },
      name: {
        contains: ename || "",
        mode: "insensitive"
      }
    },
    include: {
      comedianDetails: {
        select: {
          firstName: true,
          lastName: true,
          avatar: true
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

  // Applying filter for comedianId :-
  if (comedianId) {
    allEvents = allEvents.filter((eventDetails) => {
      if (eventDetails.comedianId === comedianId) {
        return eventDetails;
      }
    });
  }
  // Applying filter for Location Id :-
  if (locationId) {
    allEvents = allEvents.filter((eventDetails) => {
      if (eventDetails.venueDetails.locationId === +locationId) {
        return eventDetails;
      }
    });
  }
  // Applying filter for Venue Id :-
  if (venueId) {
    allEvents = allEvents.filter((eventDetails) => {
      if (eventDetails.venueId === +venueId) {
        return eventDetails;
      }
    });
  }

  return allEvents;
};

export const getAllCompletedEventList = async () => {
  const currentTime = new Date().toISOString();

  return await prisma.event.findMany({
    where: {
      endTime: {
        lt: currentTime
      }
    }
  });
};
export const getAllEventsList = async () => await prisma.event.findMany();
