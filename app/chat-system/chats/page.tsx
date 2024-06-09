import ItemList from "@/components/shared/ItemList";
import ConversationList from "@/components/shared/chat-system/ConversationList";
import React from "react";

const ChatMainPage = () => {
  return (
    <section className="flex">
      <div className="border-r min-w-[500px]">
        <ConversationList />
      </div>
    </section>
  );
};

export default ChatMainPage;
