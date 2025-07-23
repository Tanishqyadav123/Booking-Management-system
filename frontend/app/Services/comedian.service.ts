import axios from "axios"
import { comedianListApiResponse } from "../responseTypes/comedian.response"

const token = localStorage.getItem("authToken") || ""
export const fetchAllComedianService = async (searchVal : string = "") =>{
    const response : {data : comedianListApiResponse} =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comedian?search_val=${searchVal}` , {
        headers : {
             Authorization : `Bearer ${token}`
        }
     })

     return response.data 
}