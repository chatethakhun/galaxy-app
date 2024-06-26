import { Id } from "@/convex/_generated/dataModel";
import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoChevronBack } from "react-icons/io5";

type Props = {
  contact: User & { lastSeenMessageId: Id<"messages"> | undefined };
};

const ChatHeader = ({ contact }: Props) => {
  return (
    <div className="flex w-full border-b px-5 py-3 gap-2 items-center">
      <Link className="md:hidden" href="/chat-system/chats">
        <IoChevronBack size={24} />
      </Link>
      <div>
        <Image
          src={contact?.imageUrl || "/images/avatar.png"}
          className="rounded-full"
          alt="avatar"
          width={50}
          height={50}
        />
      </div>

      <div className="ml-3 flex flex-col justify-center">
        <div className="font-semibold">{contact?.username}</div>
        <div className="text-xs text-gray-500">{contact?.email}</div>
      </div>
    </div>
  );
};

export default ChatHeader;
