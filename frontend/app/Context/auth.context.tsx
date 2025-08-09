"use client";

import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserDetailsService } from "../Services/auth.service";
import toast from "react-hot-toast";
import { UserProfileType } from "../responseTypes/auth.response";

interface authContextInterface {
  isAuthenticated: boolean | null;
  userDetails: UserProfileType | null;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>;
  setUserDetails: Dispatch<SetStateAction<UserProfileType | null>>;
  logoutUser: () => void;
  fetchUserDetails: () => Promise<void>;
}
const AuthContext = createContext<authContextInterface | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userDetails, setUserDetails] = useState<UserProfileType | null>(null);
  const pathName = usePathname();
  const router = useRouter();

  // All Routes with are UnProtected :-
  const allRoutes = ["/login", "/register", "/send-otp", "/verify-otp"];

  // Logout Function :-
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUserDetails(null);
    router.push("/login");
  };

  const fetchUserDetails = async () => {
    try {
      const res = await getUserDetailsService();
      if (res.success) {
        toast.success(res.message);
      }
      if (res.data) {
        setUserDetails(res.data);
      }
    } catch (error) {
      toast.error("Error while fetching the user Details");
    }
  };

  useEffect(() => {
    // Extract the token (auth) from localStorage :-
    const authToken = localStorage.getItem("authToken");

    if (allRoutes.includes(pathName) && authToken) {
      router.push("/");
      setIsAuthenticated(true);
    } else if (!allRoutes.includes(pathName) && !authToken) {
      router.push("/login");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(authToken ? true : false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userDetails,
        setIsAuthenticated,
        setUserDetails,
        logoutUser,
        fetchUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Creating the hook for extracting the auth Context :-
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error in AuthContext");
  }
  return context;
};
