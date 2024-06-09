import { query } from "./_generated/server";
import { identifyUser } from "./_utils";

export const getFriends = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await identifyUser({ ctx });

    const friendsUser1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
      .collect();

    const friendsUser2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
      .collect();

    const friends = [...friendsUser1, ...friendsUser2];

    const friendsWithUserInfo = Promise.all(
      friends.map(async (friend) => {
        const myFriend = await ctx.db.get(friend.user1);
        return {
          ...friend,
          myFriend,
        };
      })
    );

    return friendsWithUserInfo;
  },
});
