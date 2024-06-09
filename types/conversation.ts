import { Id } from "@/convex/_generated/dataModel";

interface Conversation {
  _id: string;
  isGroup: boolean;
  _creationTime: number;
  lastMessageId?: Id<"messages"> | string;
}
