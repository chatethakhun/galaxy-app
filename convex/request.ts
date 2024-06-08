import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    if (args.email === identity.email) {
      throw new ConvexError("You can't request yourself");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const receiver = await await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!receiver) {
      throw new ConvexError("Receiver not found");
    }

    const requestAlreadySent = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", receiver._id).eq("sender", currentUser._id)
      );

    if (requestAlreadySent) {
      throw new ConvexError("Request already send");
    }

    const requestAlreadyReceiver = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", currentUser._id)
      );

    if (requestAlreadyReceiver) {
      throw new ConvexError("Request already received");
    }

    const request = await ctx.db.insert("requests", {
      sender: currentUser._id,
      receiver: receiver._id,
    });

    return request;
  },
});
export const get = query({
  args: {},
  handler: async (ctx) => {
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

    const requests = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", currentUser._id))
      .collect();

    const requestsWithSender = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.sender);

        if (!sender) {
          throw new ConvexError("Sender not found");
        }

        return {
          sender,
          request,
        };
      })
    );

    return requestsWithSender;
  },
});
