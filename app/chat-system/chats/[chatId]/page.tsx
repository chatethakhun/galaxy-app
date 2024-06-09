import ConversationList from "@/components/shared/chat-system/ConversationList";
import ConversationRoom from "@/components/shared/chat-system/ConversationRoom";
import React from "react";

type Props = {};

const ChatPage = (props: Props) => {
  return (
    <section className="flex w-full">
      <div className="min-w-[300px] max-w-[300px]">
        <ConversationList />
      </div>
      <ConversationRoom />
    </section>
  );
};

export default ChatPage;
