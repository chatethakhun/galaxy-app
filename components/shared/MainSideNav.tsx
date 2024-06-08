"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "react-tooltip";
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

  return (
    <div className="bg-blue-600 pt-10">
      <ul className="flex flex-col ">
        {items.map((item, index) => {
          const spiltPath = pathname.split("/");
          const currentPath = spiltPath[spiltPath.length - 1];
          const isActive = currentPath === item.href;
          return (
            <li key={index} className={cn("p-3", { "bg-blue-900": isActive })}>
              <Link
                id={item.name}
                href={`${prefixPath}/${item.href}`}
                className=" text-white"
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
    </div>
  );
};

export default MainSideNav;
