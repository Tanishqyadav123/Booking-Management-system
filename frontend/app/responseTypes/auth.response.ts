import { userRoleType } from "../entity/userRole.enum";

export interface UserProfileType {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  userType: userRoleType;
  avatar: string | null;
}

