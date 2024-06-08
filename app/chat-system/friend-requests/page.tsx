"use client";
import ItemList from "@/components/shared/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { LuUserPlus2 } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutationState } from "@/hooks/useMutationState";
import Request from "@/components/shared/chat-system/Request";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email can't be blank" })
    .email({ message: "Invalid email" }),
});

const FriendListPage = () => {
  const requests = useQuery(api.request.get);
  const { mutate: createRequestFriend, pending: isMutating } = useMutationState(
    api.request.create
  );
  const { control, handleSubmit, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const { email } = data;
    await createRequestFriend({ email })
      .then(() => {
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="flex">
      <div className="border-r md:min-w-[500px]">
        {requests ? (
          <ItemList
            title="Friend requests"
            noItems={Number(requests?.length) === 0}
            onAction={() => setShowAddModal(true)}
            onActionIcon={<LuUserPlus2 size={20} />}
          >
            {requests.map((request) => (
              <Request key={request.sender._id} request={request} />
            ))}
          </ItemList>
        ) : (
          <div className="h-full mt-4">
            <Loader2 className="mx-auto animate-spin duration-700" />
          </div>
        )}
      </div>

      <Dialog
        open={showAddModal}
        onOpenChange={(isOpen) => setShowAddModal(isOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add friend</DialogTitle>
            <DialogDescription>
              Send a friend request to someone by entering their email address
            </DialogDescription>

            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-2">
                <Input
                  {...control.register("email")}
                  placeholder="Enter a email..."
                />
                <Button disabled={isMutating}>
                  {isMutating ? (
                    <Loader2 className="animate-spin duration-800" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FriendListPage;
