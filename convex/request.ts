import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId, identifyUser } from "./_utils";

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
      )
      .collect();

    if (requestAlreadySent.length) {
      throw new ConvexError("Request already send");
    }

    const requestAlreadyReceiver = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", currentUser._id).eq("sender", receiver._id)
      )
      .collect();

    if (requestAlreadyReceiver.length) {
      throw new ConvexError("This user already sent you a request");
    }

    const friend1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
      .collect();

    const friend2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
      .collect();

    if (
      friend1.some((f) => f.user2 === receiver._id) ||
      friend2.some((f) => f.user1 === receiver._id)
    ) {
      throw new ConvexError("You are already friends");
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

export const reject = mutation({
  args: {
    requestId: v.id("requests"),
  },
  handler: async (ctx, args) => {
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

    const request = await ctx.db.get(args.requestId);

    if (!request) {
      throw new ConvexError("Request not found");
    }

    if (request.receiver !== currentUser._id) {
      throw new ConvexError("You can't reject this request");
    }

    await ctx.db.delete(args.requestId);
  },
});

export const acceptFriendRequest = mutation({
  args: {
    id: v.id("requests"),
  },
  handler: async (ctx, args) => {
    const currentUser = await identifyUser({ ctx });

    const request = await ctx.db.get(args.id);

    if (!request || request.receiver !== currentUser._id) {
      throw new ConvexError("Request not found");
    }

    const conversationID = await ctx.db.insert("conversations", {
      isGroup: false,
    });

    await ctx.db.insert("friends", {
      user1: currentUser._id,
      user2: request.sender,
      conversationId: conversationID,
    });

    await ctx.db.insert("conversationMembers", {
      memberId: currentUser._id,
      conversationId: conversationID,
    });

    await ctx.db.insert("conversationMembers", {
      memberId: request.sender,
      conversationId: conversationID,
    });

    await ctx.db.delete(request._id);
  },
});
