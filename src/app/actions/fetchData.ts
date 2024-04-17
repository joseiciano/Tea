import { db } from "~/server/db";
export async function getCompanyData(page = 0, take = 15) {
  "use server";

  const companies = await db.review.findMany({
    skip: page * take,
    take: take,
    orderBy: {
      date_created: "desc",
    },
  });

  return companies;
}

export async function getCompanyDataPageCount() {
  const count = await db.review.count();
  return count;
}
