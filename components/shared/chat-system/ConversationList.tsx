"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import ItemListContainer from "@/components/shared/ItemListContainer";
import Conversation from "@/components/shared/chat-system/Conversation";
import { Doc } from "@/convex/_generated/dataModel";

const ConversationList = () => {
  const conversations = useQuery(api.conversation.get);
  return (
    <div className="h-full">
      <ItemListContainer data={conversations} title="Chats">
        {conversations?.map((conversation) => {
          return (
            <Conversation
              key={conversation.conversation._id}
              conversation={conversation.conversation}
              otherMember={conversation.otherMember}
              lastMessage={
                conversation.lastMessage as Doc<"messages"> & {
                  isCurrentUser: boolean;
                }
              }
            />
          );
        })}
      </ItemListContainer>
    </div>
  );
};

export default ConversationList;
