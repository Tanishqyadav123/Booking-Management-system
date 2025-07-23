export type singleComedianType = {
     id : string,
     firstName : string,
     lastName : string,
     avatar ?: string
}

export type comedianListApiResponse = {
     success : true,
     message : string,
     data : singleComedianType[]

}
