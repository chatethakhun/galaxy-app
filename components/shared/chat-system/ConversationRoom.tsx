"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import ChatHeader from "./ChatHeader";

type Props = {};

const ConversationRoom = (props: Props) => {
  const params = useParams();
  const { chatId } = params;
  const conversation = useQuery(api.conversation.getOne, {
    id: chatId as Id<"conversations">,
  });

  return (
    <div className="h-full w-full border relative">
      {conversation?.otherMember && (
        <ChatHeader contact={conversation.otherMember} />
      )}
    </div>
  );
};

export default ConversationRoom;
