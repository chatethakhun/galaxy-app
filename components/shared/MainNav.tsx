"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const MainNav = () => {
  const { setTheme } = useTheme();
  return (
    <nav className=" flex justify-between items-center w-full mx-auto py-3 px-2">
      <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button onClick={() => {}}>Theme</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <UserButton />
      </div>
    </nav>
  );
};

export default MainNav;
