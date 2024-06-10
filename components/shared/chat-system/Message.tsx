import { cn, timeFormat } from "@/lib/utils";
import React from "react";

type Props = {
  isCurrentUser: boolean;
  content: string;
  timeCreated: number;
};

const Message = ({ isCurrentUser = false, content, timeCreated }: Props) => {
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
          {timeFormat(timeCreated, "th-TH")}
        </span>
      </section>
    </div>
  );
};

export default Message;
