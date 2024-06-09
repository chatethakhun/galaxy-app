import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  conversation: Doc<"conversations">;
  otherMember?: Doc<"users"> | null;
  lastMessage?: Doc<"messages"> | null;
};

const Conversation = ({ conversation, otherMember, lastMessage }: Props) => {
  const params = useParams();
  const isActive = params.chatId === conversation._id;
  return (
    <Link href={`/chat-system/chats/${conversation._id}`}>
      <div
        className={cn("flex justify-between cursor-pointer px-5 py-2", {
          "bg-blue-100": isActive,
        })}
      >
        <div className="flex items-center gap-3">
          <Image
            src={otherMember?.imageUrl || "/images/avatar.png"}
            alt="User Avatar"
            width={42}
            height={42}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">
              {otherMember?.username ?? otherMember?.email}
            </div>
            <span className="font-light text-xs">
              {lastMessage ? lastMessage.content : "Start message..."}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
