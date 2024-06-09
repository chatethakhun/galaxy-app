import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  isCurrentUser: boolean;
  content: string;
};

const Message = ({ isCurrentUser = false, content }: Props) => {
  return (
    <div className={cn({ "justify-end": isCurrentUser }, "flex")}>
      <section
        className={cn(" rounded-lg px-3 py-1", {
          "bg-blue-600": isCurrentUser,
          "text-white": isCurrentUser,
          border: !isCurrentUser,
        })}
      >
        <p className={cn("font-light", { "text-white": isCurrentUser })}>
          {content}
        </p>
        <span
          className={cn("text-xs", {
            "text-white": isCurrentUser,
          })}
        >
          12:30
        </span>
      </section>
    </div>
  );
};

export default Message;
