// Seat detail for a specific seat type
interface VenueSeatDetail {
  id: number;
  venueId: number;
  seatId: number;
  seatCount: number;
  price: string;
  createdAt: string;
  updatedAt: string;
}

// Main venue data including seat details
interface VenueData {
  id: number;
  name: string;
  locationId: number;
  address: string;
  venueImage?: string;
  createdAt: string;
  updatedAt: string;
  venuePrice: string;
  VenueSeatDetails: VenueSeatDetail[];
}

// Full API response structure
interface VenueDetailApiResponse {
  success: boolean;
  message: string;
  data: VenueData;
}
