export type allCompletedEventListType = { 
     id : number,
     comedianId : string,
     venueId : number,
     eventBanner ?: string,
     startTime : string,
     endTime : string,
     name : string,
     description ?: string,
     entireVenue : boolean,
     createdAt : string, 
     updatedAt : string, 

}

export type AllCompletedEventApiRes = {
     success : true,
     message : string,
     data : allCompletedEventListType[]
}