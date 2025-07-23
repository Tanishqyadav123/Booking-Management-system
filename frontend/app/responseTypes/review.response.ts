
export type reviewApiResponseType = {
     success : boolean,
     message : string
}

type reviewUserDetailType = {
      firstName : string,
      lastName : string
}
type reviewEventDetailType = {
      name : string,
}
export type singleReviewType = {
      id : number,
      userId : string,
      eventId : number,
      rating : number,
      review ?: string,
      createdAt : string,
      updatedAt : string,
      userDetails : reviewUserDetailType,
      eventDetails : reviewEventDetailType
}

export type allReviewsApiResponseType = {
      success : boolean, 
      message : string,
      data : singleReviewType[]
}

 