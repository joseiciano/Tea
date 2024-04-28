import React from "react";
import ReviewForm from "../../_components/review-form/reviewForm";
import submitForm from "../api/review/submitForm";
import { getCompaniesList } from "../api/companies/getCompaniesList";

async function SubmitReview() {
  const companiesList = await getCompaniesList();

  return (
    <div className="mx-auto max-w-2xl ">
      <ReviewForm submitReview={submitForm} companiesList={companiesList} />
    </div>
  );
}

export default SubmitReview;
