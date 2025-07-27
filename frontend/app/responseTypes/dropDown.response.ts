export type locationDropDownType = {
  id: number;
  name: string;
  admindId: string;
  locationImage?: string;
  description?: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
};

export type locationDropDownResponseType = {
  success: boolean;
  message: string;
  data: locationDropDownType[];
};

// Interface for Venue Details :-
export interface VenueSeatDetailType {
  id: number;
  venueId: number;
  seatId: number;
  seatCount: number;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface VenueType {
  id: number;
  name: string;
  locationId: number;
  address: string;
  venueImage: string;
  createdAt: string;
  updatedAt: string;
  venuePrice: string;
  VenueSeatDetails: VenueSeatDetailType[];
}

export interface venueDropDownResponseType {
  success: boolean;
  message: string;
  data: VenueType[];
}
