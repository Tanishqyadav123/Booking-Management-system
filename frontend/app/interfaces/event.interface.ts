export interface EventComedianDetailsType {
  firstName: string;
  lastName: string;
  avatar?: string | null;
}

export interface EventVenueDetailsType {
  name: string;
  address: string;
}

export interface globalResponseType<T> {
  success: true;
  message: string;
  data?: T;
}
export interface getAllUpComingEventType {
  id: number;
  comedianId: string;
  venueId: number;
  eventBanner: string;
  startTime: string;
  endTime: string;
  name: string;
  description?: string;
  entireVenue: boolean;
  createdAt: string;
  updateAt: string;

  comedianDetails: EventComedianDetailsType;
  venueDetails: EventVenueDetailsType;
}

// Interface for single Event Details with its event seats :-
export interface SeatDetailsType {
  id: number;
  seatName: string;
  seatDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface singleSeatType {
  id: number;
  seatNumber: string;
  eventSeatId: number;
  isBooked: boolean;
}
export interface eventSeatType {
  id: number;
  eventId: number;
  seatId: number;
  seatName: string;
  seatCount: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}
export interface eventDetailsType {
  id: number;
  comedianId: string;
  venueId: number;
  eventBanner: string;
  startTime: string;
  endTime: string;
  name: string;
  description?: string | null;
  entireVenue: boolean;
  createdAt: string;
  updatedAt: string;
  venueDetails: EventVenueDetailsType;
  EventSeatDetails: eventSeatType[];
  allSingleSeats: singleSeatType[ ];
}
