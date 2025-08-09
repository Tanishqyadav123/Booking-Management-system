import { addNewReviewInterface } from "../@types/review.types";
import { prisma } from "../../../shared/src/lib/client";

export const addNewReviewService = async ({ eventId, rating, review, userId }: addNewReviewInterface) =>
  await prisma.review.create({
    data: {
      userId,
      rating,
      review,
      eventId
    }
  });

export const fetchReviewListService = async (offset: number = 1, limit: number = 10) =>
  await prisma.review.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      userDetails: {
        select: {
          firstName: true,
          lastName: true
        }
      },
      eventDetails: {
        select: {
          name: true
        }
      }
    },
    skip: offset,
    take: limit
  });

export const getReviewByIdService = async (reviewId: number) =>
  await prisma.review.findUnique({
    where: {
      id: reviewId
    }
  });

export const deleteReviewByIdService = async (reviewId: number) =>
  await prisma.review.delete({
    where: {
      id: reviewId
    }
  });
