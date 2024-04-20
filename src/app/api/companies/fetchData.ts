import { type Review } from "@prisma/client";
import { db } from "~/server/db";
import { type CompanyFilter } from "~/types/Company";
import { headers } from "next/headers";
import { rateLimit } from "~/server/ratelimit";

export async function getCompanyData(
  filters: CompanyFilter = {},
  page = 0,
  take = 15,
) {
  "use server";

  const ip = headers().get("x-forwarded-for");
  const { remaining, limit, success } = await rateLimit.limit(ip!);

  console.log("RESULTS", {
    remaining,
    limit,
    success,
  });
  let dateOrder = false;
  const orderBy: Partial<Record<keyof Review, "desc" | "asc">>[] =
    filters.sortBy?.map((sortFilter) => {
      const orderByFilter: Partial<Record<keyof Review, "desc" | "asc">> = {};
      orderByFilter[sortFilter.field] = sortFilter.reversed ? "desc" : "asc";
      if (sortFilter.field === "date_created") {
        dateOrder = true;
      }
      return orderByFilter;
    }) ?? [{ date_created: "desc" }];

  if (!dateOrder && orderBy.length > 0) {
    orderBy.push({ date_created: "desc" });
  }

  const companies = await db.review.findMany({
    skip: page * take,
    take: take,
    orderBy,
  });
  return companies;
}
