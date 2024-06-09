"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import ItemListContainer from "@/components/shared/ItemListContainer";
import Conversation from "@/components/shared/chat-system/Conversation";

type Props = {};

const ConversationList = (props: Props) => {
  const conversations = useQuery(api.conversation.get);

  console.log(conversations);
  return (
    <div className="h-full">
      <ItemListContainer data={conversations} title="Chats">
        {conversations?.map((conversation) => {
          return (
            <Conversation
              key={conversation.conversation._id}
              conversation={conversation.conversation}
              otherMember={conversation.otherMember}
            />
          );
        })}
      </ItemListContainer>
    </div>
  );
};

export default ConversationList;
