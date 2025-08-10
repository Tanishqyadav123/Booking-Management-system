export interface EmailPayloadType {
  userEmail: string;
  text: string;
  viewerName: string;
  bookedSeatNumbers: string[];
  eventName: string;
  eventStartTime: string;
  eventEndTime: string;
}

