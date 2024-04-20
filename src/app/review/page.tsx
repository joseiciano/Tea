import React from "react";
import ReviewForm from "../_components/review-form/reviewForm";
import submitForm from "../api/review/submitForm";
import { getReview } from "../api/review/fetchReview";
import { getCompaniesList } from "../api/companies/getCompaniesList";

async function ReadReview({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
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
    <div className="mx-auto max-w-2xl ">
      <ReviewForm
        submitReview={submitForm}
        readOnly
        reviewInfo={reviewInfo}
        companiesList={companiesList}
      />
    </div>
  );
}

export default ReadReview;
