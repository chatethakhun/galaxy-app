import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";

type Props = { request: any };

function Request({ request }: Props) {
  const { mutate: rejectRequest, pending } = useMutationState(
    api.request.reject
  );
  const onConfirm = () => {};
  const onReject = async () => {
    try {
      await rejectRequest({ requestId: request.request._id });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-between">
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
