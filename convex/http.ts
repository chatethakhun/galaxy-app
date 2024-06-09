import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";
import { CLERK_WEBHOOK } from "@/constants/clerkWebhook";

const http = httpRouter();

const validatePayload = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();

  const svixHeaders = {
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
    "svix-id": req.headers.get("svix-id")!,
  };

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string);

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;

    return event;
  } catch (error) {
    console.error("Error validating webhook", error);
    return;
  }
};

const handleWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req);

  if (!event) {
    return new Response("Invalid webhook", { status: 400 });
  }

  switch (event.type) {
    case CLERK_WEBHOOK.USER_CREATED:
      const user = await ctx.runQuery(internal.user.get, {
        clerkId: event.data.id!,
      });

      if (user) {
        console.log(`Updating user with ${event.data.id} with ${event.data}`);
      }

      break;
    case CLERK_WEBHOOK.USER_UPDATED:
      console.log(`Updating/Creating user: ${event.data.id}`);

      const userData = event.data as UserJSON;

      const existingUser = await ctx.runQuery(internal.user.get, {
        clerkId: event.data.id!,
      });

      if (existingUser) {
        await ctx.runMutation(internal.user.update, {
          clerkId: userData.id,
          imageUrl: userData.image_url,
          username: `${userData?.first_name ?? "John"} ${userData?.last_name ?? "Doe"}`,
        });

        return new Response("OK", { status: 200 });
      }

      await ctx.runMutation(internal.user.create, {
        username: `${userData?.first_name ?? "John"} ${userData?.last_name ?? "Doe"}`,
        email: userData.email_addresses[0].email_address,
        clerkId: userData.id,
        imageUrl: userData.image_url,
      });

      break;
    case CLERK_WEBHOOK.USER_DELETED:
      console.log(`Deleting user: ${event.data.id}`);
      await ctx.runMutation(internal.user.remove, {
        clerkId: event.data.id!,
      });
    default:
      console.log(`Webhook event not handled: ${event.type}`);
      break;
  }

  return new Response("OK", { status: 200 });
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleWebhook,
});

export default http;
