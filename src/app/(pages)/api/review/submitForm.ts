import { type Review } from ".prisma/client";
import { ReviewFormSchema, type ReviewForm } from "~/types/Review.types";
export default async function submitForm(values: ReviewForm) {
  "use server";

  if (values.honey) {
    throw new Error("Error submitting form. Please try again later.");
  }

  ReviewFormSchema.parse(values);

  if (values.company === "Other" && values.companyOther) {
    values.company = values.companyOther;
  }

  values.company = values.company[0]!.toUpperCase() + values.company.slice(1);

  // Just to be cool can add extra checks with chatgpt
  // Save form to database

  // Return form info
  return values as unknown as Review;
}
