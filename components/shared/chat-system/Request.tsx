import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import toast, { useToaster } from "react-hot-toast";
import { Doc } from "@/convex/_generated/dataModel";

type Props = {
  request: { sender: Doc<"users">; request: Doc<"requests"> };
};

function Request({ request }: Props) {
  const { mutate: rejectRequest, pending } = useMutationState(
    api.request.reject
  );

  const { mutate: acceptRequest, pending: acceptFriendRequestPending } =
    useMutationState(api.request.acceptFriendRequest);

  const onConfirm = async () => {
    try {
      await acceptRequest({ id: request.request._id });
      toast.success("Request accepted successfully.");
    } catch (error) {
      toast.error("Failed to accept request, please try again later.");
    }
  };
  const onReject = async () => {
    try {
      await rejectRequest({ requestId: request.request._id });
      toast.success("Request rejected successfully.");
    } catch (error) {
      toast.error("Failed to reject request, please try again later.");
    }
  };
  return (
    <div className="flex justify-between px-5 py-2">
      <div className="flex items-center gap-3">
        <Image
          src={request.sender.imageUrl}
          alt="User Avatar"
          width={42}
          height={42}
          className="rounded-full"
        />
        <div>
          <div className="font-semibold">{request.sender.username}</div>
          <div className="text-sm text-gray-400">{request.sender.email}</div>
        </div>
      </div>

      <div>
        <Button
          variant="ghost"
          size="sm"
          className="text-green-500"
          onClick={onConfirm}
        >
          <FaCheck size={20} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500"
          onClick={onReject}
        >
          <ImCross size={18} />
        </Button>
      </div>
    </div>
  );
}

export default Request;
