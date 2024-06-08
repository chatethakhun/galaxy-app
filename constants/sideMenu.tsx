import { SideItem } from "@/components/shared/MainSideNav";
import { BsChatText } from "react-icons/bs";
import { LuUsers2 } from "react-icons/lu";

export const chatSystemSideMenu: SideItem[] = [
  {
    name: "Chats",
    icon: <BsChatText size={32} />,
    href: "chats",
  },
  {
    name: "Friend requests",
    icon: <LuUsers2 size={32} />,
    href: "friend-requests",
  },
];
