import { userRoleType } from "../entity/userRole.enum";

export interface AdminProfileDetailsType {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userType: userRoleType;
}


interface AnalyticsCardDataType {
   totalEvents : number,
   totalComedians : number,
   totalBooking : number,
   totalRevenue : string
}

export interface SingleRecentEventWithRevenueType {
   eventName: string,
   comedianName : string,
   eventRevenue: number
}
export interface SingleAnalyticsComedianType  {
      firstName: string,
      lastName: string,
      eventDetails: {
              name: string
          }[],
      _count: {
          eventDetails: number
      }
}

export interface SingleLineGraphDataType {
   date : string,
   revenue : number,
   seats : number,
   booking : number
}
export interface DashboardAnalyticsDataType {
     cardData : AnalyticsCardDataType,
     recentEventWithRevenue : SingleRecentEventWithRevenueType[]
     comedianDetails : SingleAnalyticsComedianType[],
     lineGraphData : SingleLineGraphDataType[]

}
