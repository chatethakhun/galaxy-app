"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/useMutationState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {};
const schema = z.object({
  message: z.string().min(1, { message: "Please enter content" }),
});

const ChatInput = (props: Props) => {
  const { register, handleSubmit, reset } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(schema),
  });

  const { mutate: sendMessage, pending: isSending } = useMutationState(
    api.message.createMessage
  );

  const params = useParams();
  const { chatId } = params;

  const onSendMessage = async (data: z.infer<typeof schema>) => {
    const { message } = data;

    await sendMessage({
      conversationId: chatId,
      content: [message],
      type: "text",
    })
      .then(() => {
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to send message");
      });
  };

  return (
    <form
      className=" flex items-center pr-4"
      onSubmit={handleSubmit(onSendMessage)}
    >
      <div className="p-4 w-full">
        <Input placeholder="Type a message" {...register("message")} />
      </div>

      <Button disabled={isSending}>Send</Button>
    </form>
  );
};

export default ChatInput;
