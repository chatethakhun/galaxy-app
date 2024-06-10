import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import Message from "./Message";

type Props = {};

const ConversationBody = (props: Props) => {
  const params = useParams();

  const { chatId } = params;

  const messages = useQuery(api.message.get, {
    id: chatId as Id<"conversations">,
  });

  return (
    <div className="h-full flex flex-col-reverse px-4 gap-2 overflow-scroll py-2">
      {messages?.map((message) => (
        <Message
          key={message._id}
          isCurrentUser={message.isCurrentUser}
          content={message.content[0]}
          timeCreated={message._creationTime}
        />
      ))}
    </div>
  );
};

export default ConversationBody;
