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
