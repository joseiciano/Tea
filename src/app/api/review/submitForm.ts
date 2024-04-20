import { type Review } from ".prisma/client";
import { ReviewFormSchema, type ReviewForm } from "~/types/Review.types";
export default async function submitForm(values: ReviewForm) {
  "use server";

  ReviewFormSchema.parse(values);

  if (values.company === "Other" && values.companyOther) {
    values.company = values.companyOther;
  }

  values.company = values.company[0]!.toUpperCase() + values.company.slice(1);

  return values as unknown as Review;
}
