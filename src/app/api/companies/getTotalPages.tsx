import { db } from "~/server/db";
import { headers } from "next/headers";
import { rateLimit } from "~/server/ratelimit";

export async function getTotalReviewPages() {
  const ip = headers().get("x-forwarded-for");
  const { remaining, limit, success } = await rateLimit.limit(ip!);

  const count = await db.review.count();
  return count;
}
