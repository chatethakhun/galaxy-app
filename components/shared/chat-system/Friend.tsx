import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import React from "react";

type Props = {
  friendInfo: Doc<"friends"> & { myFriend: Doc<"users"> };
};

const Friend = ({ friendInfo }: Props) => {
  if (!friendInfo.myFriend) return null;

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={friendInfo.myFriend.imageUrl}
          alt="User Avatar"
          width={42}
          height={42}
          className="rounded-full"
        />
        <div>
          <div className="font-semibold">
            {friendInfo.myFriend.username || friendInfo.myFriend.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;
