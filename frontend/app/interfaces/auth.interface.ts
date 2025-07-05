import { userRoleType } from "../entity/userRole.enum"

export interface sendOtpInterface {
     phoneNumber : string
}

export interface verifyOtpInterface {
     phoneNumber : string ,
     otp : string,
     codeType : "VERIFY" | "FORGOT"
}

export interface signInInterface {
     email : string,
     password : string
}

export interface signUpInterface {
     firstName : string,
     lastName : string,
     email : string,
     password : string,
     phoneNumber : string,
     userType : userRoleType
}