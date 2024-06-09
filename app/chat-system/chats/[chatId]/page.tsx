import ConversationList from "@/components/shared/chat-system/ConversationList";
import ConversationRoom from "@/components/shared/chat-system/ConversationRoom";
import React from "react";

type Props = {};

const ChatPage = (props: Props) => {
  return (
    <section className="flex w-screen">
      <div className="min-w-[300px]">
        <ConversationList />
      </div>
      <div className="">
        <ConversationRoom />
      </div>
    </section>
  );
};

export default ChatPage;
