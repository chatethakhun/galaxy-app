import { query } from "./_generated/server";
import { identifyUser } from "./_utils";

export const getFriends = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await identifyUser({ ctx });

    const friends = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
      .collect();
    const friendsWithUserInfo = Promise.all(
      friends.map(async (friend) => {
        const myFriend = await ctx.db.get(friend.user2);
        return {
          ...friend,
          myFriend,
        };
      })
    );

    return friendsWithUserInfo;
  },
});
