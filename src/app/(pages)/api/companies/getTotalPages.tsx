import { db } from "~/server/db";
import { headers } from "next/headers";
import { rateLimit } from "~/server/ratelimit";

export async function getTotalReviewPages(company?: string) {
  // const ip = headers().get("x-forwarded-for");
  // const { remaining, limit, success } = await rateLimit.limit(ip!);

  if (company) {
    return await db.review.count({
      where: {
        company: company,
      },
    });
  }

  return await db.review.count();
}
