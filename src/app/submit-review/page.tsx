import React from "react";
import ReviewForm from "../_components/review-form/reviewForm";
import submitForm from "../actions/submitForm";

async function SubmitReview() {
  return (
    <div className="mx-auto max-w-2xl ">
      <ReviewForm submitReview={submitForm} />
    </div>
  );
}

export default SubmitReview;
