"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ConversationBody from "./ConversationBody";

type Props = {};

const ConversationRoom = (props: Props) => {
  const params = useParams();
  const { chatId } = params;
  const conversation = useQuery(api.conversation.getOne, {
    id: chatId as Id<"conversations">,
  });

  return (
    <div className="h-[calc(100%-64px)] w-full relative flex flex-col border-l">
      <div className="grow-0 shrink basis-auto">
        {conversation?.otherMember && (
          <ChatHeader contact={conversation.otherMember} />
        )}
      </div>
      <div className="grow shrink basis-auto overflow-scroll">
        <ConversationBody />
      </div>
      <div className="grow-0 shrink basis-auto">
        <ChatInput />
      </div>
    </div>
  );
};

export default ConversationRoom;
