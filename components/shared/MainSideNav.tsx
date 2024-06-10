"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "react-tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "../ui/button";
import { GiHamburgerMenu } from "react-icons/gi";

export type SideItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

type MainSideNavProps = {
  items: SideItem[];
  prefixPath?: string;
};
const MainSideNav = ({ items, prefixPath = "" }: MainSideNavProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const renderMenu = ({ isResponsive = true }: { isResponsive?: boolean }) => (
    <ul className={cn({ "hidden sm:block": isResponsive })}>
      {items.map((item, index) => {
        const spiltPath = pathname.split("/");
        const currentPath = spiltPath[spiltPath.length - 1];
        const isActive = currentPath === item.href;
        return (
          <li key={index} className={cn("p-3", { "bg-blue-900": isActive })}>
            <Link
              id={item.name}
              href={`${prefixPath}/${item.href}`}
              className=" text-white text-center flex justify-center"
            >
              {item.icon}
            </Link>
            <Tooltip
              id={item.name}
              place="right"
              anchorSelect={`#${item.name}`}
              className="rounded-lg"
            >
              {item.name}
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="bg-blue-600 pt-10">
      {renderMenu({ isResponsive: true })}
      <Button
        size="icon"
        className="fixed bottom-2 right-2 rounded-full p-1 sm:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <GiHamburgerMenu size={24} />
      </Button>

      <Sheet onOpenChange={setIsOpen} open={isOpen}>
        <SheetContent
          className="p-0 bg-blue-600 w-[70px] border-none"
          side="left"
        >
          <div className="mt-10"></div>
          {renderMenu({ isResponsive: false })}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainSideNav;
