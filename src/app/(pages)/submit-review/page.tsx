import React from "react";
import ReviewForm from "../../_components/review-form/reviewForm";
import submitForm from "../api/review/submitForm";
import { getCompaniesList } from "../api/companies/getCompaniesList";

async function SubmitReview() {
  const companiesList = await getCompaniesList();

  return <ReviewForm submitReview={submitForm} companiesList={companiesList} />;
}

export default SubmitReview;
