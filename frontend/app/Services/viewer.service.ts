import axios from "axios";
import { AllCompletedEventApiRes } from "../responseTypes/viewer.response";

const token : string = localStorage.getItem("authToken") || "";
export const fetchAllCompletedEventListService = async() : Promise<AllCompletedEventApiRes> =>{
     const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/viewer/all-completed-event` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
     })

     return response.data as AllCompletedEventApiRes
}