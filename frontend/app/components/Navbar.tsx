"use client";

import React, { useDebugValue, useEffect } from "react";
import logo from "@/public/images.png";
import Image from "next/image";
import DarkButton from "./DarkButton";
import LightButton from "./LightButton";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../Context/auth.context";
import Link from "next/link";
import { userRoleType } from "../entity/userRole.enum";

function Navbar() {
  const { isAuthenticated, logoutUser, userDetails, fetchUserDetails } =
    useAuth();

  const allRoutes = ["/login", "/register", "/send-otp", "/verify-otp"];
  const pathName = usePathname();

  const router = useRouter();
  const sendToLogin = () => {
    router.push("/login");
  };
  const sendToRegister = () => {
    router.push("/register");
  };
  useEffect(() => {}, [isAuthenticated]);

  useEffect(() => {
    if (!userDetails && !allRoutes.includes(pathName)) {
      fetchUserDetails();
    }
  }, []);
  if (
    !allRoutes.includes(pathName) &&
    (isAuthenticated == undefined || isAuthenticated == null || !userDetails)
  ) {
    console.log();
    return <>Loading...</>;
  }

  return (
    <div className="w-full h-12 bg-white flex items-center px-8 shadow-lg justify-between">
      <div className="left">
        <Link href={"/"}>
          {" "}
          <Image src={logo} alt="" className="h-10 w-16"></Image>{" "}
        </Link>
      </div>
      {isAuthenticated ? (
        <div className="right flex items-center justify-center gap-6 ">
          {(userDetails?.userType === userRoleType?.COMEDIAN ||
            userDetails?.userType === userRoleType?.VIEWER) && (
            <>
              <Link href={"/comedians"} className="text-black">
                Comedians
              </Link>
              <Link href={"/event"} className="text-black">
                Shows
              </Link>
            </>
          )}
          {userDetails?.userType === userRoleType.VIEWER && (
            <Link href={"/reviews"} className="text-black">
              Reviews
            </Link>
          )}
          {userDetails?.userType === userRoleType.ADMIN && (
            <Link href={"/analytics"} className="text-black">
              Analytics
            </Link>
          )}
          <DarkButton btnText="Logout" callback={logoutUser} />
        </div>
      ) : (
        <div className="right flex items-center justify-center gap-4 ">
          <LightButton btnText="Sign In" callback={sendToLogin} />
          <DarkButton btnText="Sign Up" callback={sendToRegister} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
