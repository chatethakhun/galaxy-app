"use client";
import ItemList from "@/components/shared/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";

const FriendListPage = () => {
  const requests = useQuery(api.request.get);

  return (
    <section className="flex">
      <div className="border-r min-w-[500px]">
        {requests ? (
          <ItemList title="Friends" noItems={Number(requests?.length) === 0}>
            <div>Chat List</div>
          </ItemList>
        ) : (
          <div className="h-full mt-4">
            <Loader2 className="mx-auto animate-spin duration-700" />
          </div>
        )}
      </div>
    </section>
  );
};

export default FriendListPage;
