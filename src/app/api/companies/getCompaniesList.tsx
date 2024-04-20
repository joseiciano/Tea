import { db } from "~/server/db";
import { headers } from "next/headers";
import { rateLimit } from "~/server/ratelimit";

export async function getCompaniesList() {
  "use server";
  const ip = headers().get("x-forwarded-for");
  const { remaining, limit, success } = await rateLimit.limit(ip!);

  const companies = await db.review.groupBy({
    by: ["company"],
  });

  return companies.map(({ company }) => company);
}
