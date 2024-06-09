import { ConvexError } from "convex/values";
import { MutationCtx, QueryCtx } from "./_generated/server";

export const getUserByClerkId = async ({
  ctx,
  clerkId,
}: {
  ctx: QueryCtx | MutationCtx;
  clerkId: string;
}) => {
  return await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .unique();
};

export const identifyUser = async ({ ctx }: { ctx: QueryCtx }) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("Not authenticated");
  }

  const currentUser = await getUserByClerkId({
    ctx,
    clerkId: identity.subject,
  });

  if (!currentUser) {
    throw new ConvexError("User not found");
  }

  return currentUser;
};
