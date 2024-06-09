import { Doc } from "@/convex/_generated/dataModel";

interface Friend {
  _creationTime: number;
  _id: string;
  conversationId: string;
  myFriend: Doc<"users"> | null;
}
