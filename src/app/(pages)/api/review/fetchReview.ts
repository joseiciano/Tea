import "server-only";
import { db } from "~/server/db";

export async function getReview(id: string) {
  const review = await db.review.findFirst({
    where: {
      id: id,
    },
  });

  return review;
}
