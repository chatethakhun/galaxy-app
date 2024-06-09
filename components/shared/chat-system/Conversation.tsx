import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  conversation: Conversation;
  otherMember?: User | null;
};

const Conversation = ({ conversation, otherMember }: Props) => {
  return (
    <Link href={`/chat-system/chats/${conversation._id}`}>
      <div className="flex justify-between cursor-pointer">
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
              {conversation.lastMessageId ?? "Start message..."}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
