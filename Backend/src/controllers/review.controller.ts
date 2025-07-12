/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addNewReviewService,
  deleteReviewByIdService,
  fetchReviewListService,
  getReviewByIdService
} from "../repo/review.repo";
import { NextFunction, Request, Response } from "express";
import { addNewReviewSchema } from "../validations/review.validation";
import { ErrorHandler } from "../middlewares/error.middleware";
import { getEventDetailByIdService } from "../repo/event.repo";
import { responseHandler } from "../handlers/response.handler";
import { userType } from "../entity/auth.entity";

// Controller for Add New Review :-
export const addNewReview = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { userId } = req.user!;

    const { success, data } = addNewReviewSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed ", 400));
    }

    const { eventId, rating } = data;

    // Validate whether the event Id is correct or not :-
    const eventDetails = await getEventDetailByIdService(eventId);

    if (!eventDetails) {
      throw next(new ErrorHandler("Event not found", 404));
    }

    // Cast a review for this event :-
    const review = data.review || null;
    await addNewReviewService({ eventId, rating, review, userId });

    return responseHandler(res, "Review added successFully", 201);
  } catch (error) {
    throw error;
  }
};

export const getAllReviews = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    let page: string | number = req.query?.page as string;
    let limit: string | number = req.query?.limit as string;

    page = parseInt(page);
    limit = parseInt(limit);
    if (page <= 0 || limit <= 0) {
      throw next(new ErrorHandler("Invalid Page & Limit value", 400));
    }

    // Finding the offset value :-
    const offset = (page - 1) * limit;

    // Fetch all the latest reviewers with event Name :-
    const reviewList = await fetchReviewListService(offset, limit);

    return responseHandler(res, "All reviews", 200, reviewList);
  } catch (error) {
    throw error;
  }
};

export const deleteReviewById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { userId, userRole } = req.user!;

    const reviewId = req.params.reviewId;

    if (!reviewId) {
      throw next(new ErrorHandler("Review Id is not provided", 400));
    }

    // Check the review exist with this Id or not :-
    const reviewDetails = await getReviewByIdService(+reviewId);

    if (!reviewDetails) {
      throw next(new ErrorHandler("Review Details not found", 404));
    }

    // Check user validity for deleting this review :-
    if (reviewDetails.userId === userId || userRole === userType.ADMIN) {
      await deleteReviewByIdService(+reviewId);
    } else {
      throw next(new ErrorHandler("Only admin or owner of review can delete", 403));
    }

    return responseHandler(res, "Review Deleted successFully", 200);
  } catch (error) {
    throw error;
  }
};
