import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {};

const ChatInput = (props: Props) => {
  return (
    <div className="fixed bottom-0 right-0 border-t-2 flex items-center pr-4">
      <div className="bg-white p-4 w-full">
        <Input placeholder="Type a message" />
      </div>

      <Button>Send</Button>
    </div>
  );
};

export default ChatInput;
