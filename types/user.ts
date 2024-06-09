import { Id } from "@/convex/_generated/dataModel";

export interface User {
  _id?: Id<"users"> | undefined;
  username?: string | undefined;
  imageUrl?: string | undefined;
  email?: string | undefined;
  clerkId?: string | undefined;
  _creationTime?: number | undefined;
}
