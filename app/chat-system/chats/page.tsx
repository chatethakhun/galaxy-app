import ItemList from "@/components/shared/ItemList";
import ConversationList from "@/components/shared/chat-system/ConversationList";
import React from "react";

const ChatMainPage = () => {
  return (
    <section className="flex w-full">
      <div className="border-r w-full md:w-[400px]">
        <ConversationList />
      </div>
    </section>
  );
};

export default ChatMainPage;
