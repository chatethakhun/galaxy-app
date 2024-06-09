import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { identifyUser } from "./_utils";

export const createMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    type: v.string(),
    content: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await identifyUser({ ctx });

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId_conversationId", (q) =>
        q
          .eq("memberId", currentUser._id)
          .eq("conversationId", args.conversationId)
      )
      .unique();

    if (!membership) {
      throw new ConvexError("You are not a member of this conversation");
    }

    const message = await ctx.db.insert("messages", {
      senderId: currentUser._id,
      ...args,
    });

    await ctx.db.patch(args.conversationId, {
      lastMessageId: message,
    });

    return message;
  },
});

export const get = query({
  args: {
    id: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const currentUser = await identifyUser({ ctx });

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", args.id))
      .order("desc")
      .collect();

    const messageWithUser = await Promise.all(
      messages.map(async (message) => {
        const sender = await ctx.db.get(message.senderId);

        if (!sender) {
          throw new ConvexError("Sender not found");
        }
        return {
          ...message,
          senderImage: sender.imageUrl,
          senderName: sender.username,
          isCurrentUser: message.senderId === currentUser._id,
        };
      })
    );

    return messageWithUser;
  },
});
