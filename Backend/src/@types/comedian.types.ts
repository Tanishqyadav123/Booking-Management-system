export interface isVenueBusyType {
  venueId: number;
  start: string;
  end: string;
}

export interface fetchComediantype {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface fetchComedianResponseType {
  success: boolean;
  message: string;
  data: fetchComediantype[];
}
