import { prisma } from "../lib/client";

export const deleteEventByIdSerice = async (eventId: number) =>
  await prisma.event.delete({
    where: {
      id: eventId
    }
  });
