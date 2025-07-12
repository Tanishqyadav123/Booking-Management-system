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

interface authContextInterface {
  isAuthenticated: boolean | null;
  userId: string;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>;
  setUserId: Dispatch<SetStateAction<string>>;
  logoutUser: () => void;
}
const AuthContext = createContext<authContextInterface | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string>("");
  const pathName = usePathname();
  const router = useRouter();

  // All Routes with are UnProtected :-
  const allRoutes = ["/login", "/register", "/send-otp", "/verify-otp"];

  // Logout Function :-
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUserId("");
    router.push("/login");
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
      console.log("Is Comming here ", authToken);
      setIsAuthenticated(authToken ? true : false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        setIsAuthenticated,
        setUserId,
        logoutUser,
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
