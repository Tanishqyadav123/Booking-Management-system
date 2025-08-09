import { prisma } from "../../../shared/src/lib/client";
import { updateVenueType } from "../@types/venue.types";

export const getAllVenueDetailsService = async (cityId: number) =>
  await prisma.venue.findMany({
    where: {
      locationId: cityId
    }
  });
export const getAllVenueByLocationService = async (locationId: number) =>
  await prisma.venue.findMany({
    where: {
      locationId
    },
    include: {
      VenueSeatDetails: true
    }
  });

export const isVenueAlreadyExistWithNameAndAddress = async ({ name, address }: { name: string; address: string }) =>
  await prisma.venue.findFirst({
    where: {
      AND: [{ name }, { address }]
    }
  });

export const getVenueByIdService = async (venueId: number) =>
  await prisma.venue.findUnique({
    where: {
      id: venueId
    }
  });

export const updateVenueDetailsByIdService = async ({
  venueDetailsToUpdate,
  venueId
}: {
  venueDetailsToUpdate: updateVenueType;
  venueId: number;
}) =>
  prisma.venue.update({
    where: {
      id: venueId
    },
    data: {
      ...venueDetailsToUpdate
    }
  });

// Is any event is already scheduled on venue :-
export const isEventScheduledOnVenueService = async (venueId: number) =>
  await prisma.event.findFirst({
    where: {
      venueId
    }
  });

// Delete Venue By Id :-
export const deleteVenueByIdService = async (venueId: number) =>
  await prisma.venue.delete({
    where: {
      id: venueId
    }
  });

// Get Venue Details with its Seats Details :-
export const getVenueDetailsWithSeatService = async (venueId: number) =>
  prisma.venue.findUnique({
    where: {
      id: venueId
    },
    include: {
      VenueSeatDetails: true
    }
  });
