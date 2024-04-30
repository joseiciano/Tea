import React from "react";
import { getReview } from "../api/review/fetchReview";
import { getCompaniesList } from "../api/companies/getCompaniesList";
import ReviewForm from "~/app/_components/review-form/reviewForm";
import submitForm from "../api/review/submitForm";

async function ReadReview({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { id } = searchParams;
  if (!id) {
    throw new Error("No Id provided");
  }

  const reviewInfo = await getReview(id);
  if (!reviewInfo) {
    throw new Error("Could not find info");
  }

  const companiesList = await getCompaniesList();

  return (
    <ReviewForm
      submitReview={submitForm}
      readOnly
      reviewInfo={reviewInfo}
      companiesList={companiesList}
    />
  );
}

export default ReadReview;
