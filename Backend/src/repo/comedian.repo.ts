import { prisma } from "../../../shared/src/lib/client";

export const deleteEventByIdSerice = async (eventId: number) =>
  await prisma.event.delete({
    where: {
      id: eventId
    }
  });

export const getAllComedianList = async (searchVal = "") =>
  await prisma.user.findMany({
    where: {
      userType: "COMEDIAN",
      OR: [
        {
          firstName: {
            contains: searchVal,
            mode: "insensitive"
          }
        },
        {
          lastName: {
            contains: searchVal,
            mode: "insensitive"
          }
        }
      ]
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatar: true
    }
  });
