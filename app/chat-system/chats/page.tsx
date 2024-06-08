import ItemList from "@/components/shared/ItemList";
import React from "react";

const ChatMainPage = () => {
  return (
    <section className="flex">
      <div className="border-r">
        <ItemList noItems>
          <div>Chat List</div>
        </ItemList>
      </div>
      <div>Conversation Section</div>
    </section>
  );
};

export default ChatMainPage;
