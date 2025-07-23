import axios from "axios";
import { addNewReviewType } from "../interfaces/review.interface";
import { allReviewsApiResponseType, reviewApiResponseType } from "../responseTypes/review.response";

const token : string = localStorage.getItem("authToken") || "";
export const addNewReviewService = async (payload : addNewReviewType) : Promise<reviewApiResponseType> =>{
    const res =  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/review` , {
        ...payload
     } , {
        headers : {
             Authorization : `Bearer ${token}`
        }
     })
     return res.data as reviewApiResponseType;
}

export const fetchAllReviewsService = async(page : number = 1 , limit : number = 3) => {
     const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/review?page=${page}&limit=${limit}` , {
         headers : {
             Authorization : `Bearer ${token}`
         }
     })
     return response.data as allReviewsApiResponseType
}