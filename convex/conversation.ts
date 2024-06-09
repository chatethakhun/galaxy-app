import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { identifyUser } from "./_utils";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await identifyUser({ ctx });

    const conversationMembers = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId", (q) => q.eq("memberId", currentUser._id))
      .collect();

    const conversations = await Promise.all(
      conversationMembers.map(async (conversationMember) => {
        const conversation = await ctx.db.get(
          conversationMember.conversationId
        );

        if (!conversation) {
          throw new ConvexError("Conversation not found");
        }
        return conversation;
      })
    );

    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conversation, index) => {
        const allConversationMembers = await ctx.db
          .query("conversationMembers")
          .withIndex("by_conversationId", (q) =>
            q.eq("conversationId", conversation._id)
          )
          .collect();

        if (conversation.isGroup) {
          return {
            conversation,
          };
        }

        const otherMembership = allConversationMembers.filter(
          (member) => member.memberId !== currentUser._id
        )[0];

        const otherMember = await ctx.db.get(otherMembership.memberId);

        return {
          conversation,
          otherMember,
        };
      })
    );

    return conversationsWithDetails;
  },
});

export const getOne = query({
  args: {
    id: v.id("conversations"),
  },
  handler: async (ctx, { id }) => {
    const currentUser = await identifyUser({ ctx });

    const conversation = await ctx.db.get(id);

    if (!conversation) {
      throw new ConvexError("Conversation not found");
    }

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId_conversationId", (q) =>
        q.eq("memberId", currentUser._id).eq("conversationId", conversation._id)
      );

    if (!membership) {
      throw new ConvexError("You are not a member of this conversation");
    }

    const allConversationMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", id))
      .collect();

    if (!conversation?.isGroup) {
      const otherMembership = allConversationMemberships.filter(
        (member) => member.memberId !== currentUser._id
      )[0];

      const otherMembershipDetails = await ctx.db.get(otherMembership.memberId);

      return {
        ...conversation,
        otherMember: {
          ...otherMembershipDetails,
          lastSeenMessageId: otherMembership.lastSeenMessage,
        },
        otherMembers: null,
      };
    }
  },
});
