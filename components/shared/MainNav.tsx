import React from "react";
import Image from "next/image";
import { SignInButton, SignUp, SignedIn, UserButton } from "@clerk/nextjs";
const MainNav = () => {
  return (
    <nav className=" flex justify-between items-center w-full mx-auto py-3 px-2 border-b-2 border-b-gray-100">
      <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      <UserButton showName />
    </nav>
  );
};

export default MainNav;
