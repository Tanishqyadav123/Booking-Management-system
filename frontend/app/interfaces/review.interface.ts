export type addNewReviewType = {
     review ?: string,
     rating : number,
     eventId : number
}

export type reviewCardPropsType = {
     firstName : string,
     lastName : string,
     eventName : string,
     rating : number,
     review ?: string
}