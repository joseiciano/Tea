import React from "react";
import ReviewForm from "../_components/review-form/reviewForm";
import submitForm from "../actions/submitForm";

function SubmitReview() {
  return (
    <div>
      <div className="mx-auto max-w-2xl ">
        <ReviewForm submitReview={submitForm} />
      </div>
    </div>
  );
}

export default SubmitReview;
