/* eslint-disable @typescript-eslint/no-explicit-any */
import { createNewUserService, isAdminExistWithEmailOrPhoneService } from "../repo/auth.repo";
import { NextFunction, Request, Response } from "express";
import { signInUserSchema, signUpUserSchema } from "../validations/auth.validation";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../middlewares/error.middleware";
import { getAdminProfileDetails } from "../repo/admin.repo";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { prisma } from "../../../shared/src/lib/client";
import { responseHandler } from "../handlers/response.handler";
import { userType } from "../entity/auth.entity";

const adminSignUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = signUpUserSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    // Check if any email is already exist :-
    const isEmailExist = await isAdminExistWithEmailOrPhoneService({ email: data.email });

    if (isEmailExist) {
      throw next(new ErrorHandler("User already exist with this email address ", 400));
    }

    const isPhoneExist = await isAdminExistWithEmailOrPhoneService({ phoneNumber: data.phoneNumber });

    if (isPhoneExist) {
      throw next(new ErrorHandler("User already exist with this Phone Number ", 400));
    }

    // Hashing the password :-
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new Admin :-
    const newAdminUser = await createNewUserService({ ...data, password: hashedPassword });

    return responseHandler(res, "New Admin Created SuccessFully", 201, newAdminUser);
  } catch (error) {
    throw error;
  }
};

const adminSignIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = signInUserSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { email, password } = data;
    // check email must exist :-
    const isEmailExist = await isAdminExistWithEmailOrPhoneService({ email });

    if (!isEmailExist) {
      throw next(new ErrorHandler("Invalid Credentails", 400));
    }

    // Check for Password :-
    const isMatch = await bcrypt.compare(password, isEmailExist.password);

    if (!isMatch) {
      throw next(new ErrorHandler("Invalid Credentails", 400));
    }

    // Generate the token with userId and userRole :-
    const token = jwt.sign({ userId: isEmailExist.id, userRole: isEmailExist.userType }, JWT_SECRET!, {
      expiresIn: "1d"
    });

    return responseHandler(res, "Admin Login SuccessFully", 200, { token });
  } catch (error) {
    throw error;
  }
};

const getAdminProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { userId } = req.user!;

    const adminDetails = await getAdminProfileDetails(userId);

    if (!adminDetails) {
      return next(new ErrorHandler("Admin Details not found", 404));
    }

    return responseHandler(res, "Admin Details", 200, adminDetails);
  } catch (error) {
    throw error;
  }
};

const getAnalyticsData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Step - 1 :- find data for card :-

    const totalEvents = await prisma.event.count({});
    const totalComedians = await prisma.user.count({
      where: {
        userType: userType.COMEDIAN
      }
    });
    const totalBooking = await prisma.booking.count({});

    const totalRevenue = await prisma.booking.aggregate({
      where: {
        NOT: {
          status: "PENDING"
        }
      },
      _sum: {
        amountPaid: true
      }
    });

    // Step - 2 :- Recent Shows Data upto 3 :-

    const recentEventDetails = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc"
      },
      select: {
        name: true,
        comedianDetails: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        EventSeatDetails: {
          select: {
            singleEventSeat: {
              select: {
                bookedSeatDetails: {
                  select: {
                    booking: {
                      select: {
                        id: true,
                        amountPaid: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      take: 3
    });

    // aggregating the each show revenue :-
    const recentEventWithRevenue = recentEventDetails.map((eventDetails) => {
      const bookingMap = new Map<number, number>();

      eventDetails.EventSeatDetails.forEach((eventSeatDetails) => {
        eventSeatDetails.singleEventSeat.forEach((singleEventSeat) => {
          singleEventSeat.bookedSeatDetails.forEach((bookedSeat) => {
            bookingMap.set(
              bookedSeat.booking.id, // booking ID
              +bookedSeat.booking.amountPaid
            );
          });
        });
      });

      // Sum all unique bookings
      const eventRevenue = Array.from(bookingMap.values()).reduce((acc, amount) => acc + +amount, 0);

      return {
        eventName: eventDetails.name,
        comedianName: `${eventDetails.comedianDetails.firstName} ${eventDetails.comedianDetails.lastName}`,
        eventRevenue
      };
    });

    // Step -3 :- Top 3 Comedian with most number of shows :-
    const comedianDetails = await prisma.user.findMany({
      where: {
        userType: userType.COMEDIAN
      },
      select: {
        firstName: true,
        lastName: true,
        eventDetails: {
          orderBy: {
            createdAt: "desc"
          },
          select: {
            name: true
          },
          take: 1
        },
        _count: {
          select: {
            eventDetails: true
          }
        }
      },

      take: 3
    });

    comedianDetails.sort((comedianA, comedianB) => comedianB._count.eventDetails - comedianA._count.eventDetails);

    // Step - 4 :- Data for line Graph :-

    /* 
     {
       date : "10-01-2025",
       booking : 10,
       seats : 40,
       revenue : 5500
     }
    */

    const allBooking = await prisma.booking.findMany({
      orderBy: {
        createdAt: "asc"
      },
      select: {
        createdAt: true,
        amountPaid: true,
        bookedSeatDetails: {
          select: {
            id: true
          }
        },
        _count: {
          select: {
            bookedSeatDetails: true
          }
        }
      }
    });

    const mySet = new Set<string>();

    allBooking.forEach((booking) => {
      mySet.add(new Date(booking.createdAt).toLocaleDateString());
    });

    const lineGraphData: { date: string; booking: number; seats: number; revenue: number }[] = Array.from(mySet).map(
      (setDate) => {
        let obj = {
          date: setDate,
          revenue: 0,
          seats: 0,
          booking: 0
        };
        allBooking.forEach((booking) => {
          if (new Date(booking.createdAt).toLocaleDateString() === setDate)
            obj = {
              ...obj,
              booking: obj.booking + 1,
              revenue: obj.revenue + Number(booking.amountPaid),
              seats: obj.seats + booking._count.bookedSeatDetails
            };
        });

        return obj;
      }
    );

    return responseHandler(res, "Dashboard Analytics Data", 200, {
      cardData: {
        totalEvents,
        totalComedians,
        totalBooking,
        totalRevenue: totalRevenue._sum.amountPaid
      },
      recentEventWithRevenue,
      comedianDetails,
      lineGraphData
    });
  } catch (error) {
    throw error;
  }
};

export { adminSignUp, adminSignIn, getAdminProfile, getAnalyticsData };
