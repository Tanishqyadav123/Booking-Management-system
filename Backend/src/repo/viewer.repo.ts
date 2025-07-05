import { prisma } from "../lib/client";

export const getAllLatestEvents = async () => {
  const currentTime = new Date().toISOString();

  return await prisma.event.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      startTime: {
        gt: currentTime
      }
    }
  });
};
