"use client";
import ItemList from "@/components/shared/ItemList";
import Friend from "@/components/shared/chat-system/Friend";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const FriendsPage = (props: Props) => {
  const friends = useQuery(api.friend.getFriends);
  return (
    <div className="flex">
      <div className="border-r md:min-w-[500px]">
        {friends ? (
          <ItemList title="Friends" noItems={Number(friends?.length) === 0}>
            {friends.map((friend) => (
              <Friend key={friend._id} friendInfo={friend} />
            ))}
          </ItemList>
        ) : (
          <div className="h-full mt-4">
            <Loader2 className="mx-auto animate-spin duration-700" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
