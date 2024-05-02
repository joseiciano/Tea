"use client";

import { type Review } from ".prisma/client";
import {
  Button,
  Checkbox,
  Container,
  Popover,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { type ReviewForm } from "~/types/Review.types";
import { useReviewForm } from "./useReviewForm";
import CustomRating from "../custom-rating/CustomRating";
import classes from "./ReviewForm.module.css";
import { type GetInputPropsReturnType } from "node_modules/@mantine/form/lib/types";

interface ReviewFormProps {
  submitReview: (values: ReviewForm) => Promise<Review>;
  readOnly?: boolean;
  reviewInfo?: Review;
  companiesList: string[];
}

function RatingsBlock({
  text,
  inputProps,
  errorFlag,
}: {
  text: string;
  errorFlag: boolean;
  inputProps: GetInputPropsReturnType;
}) {
  return (
    <div className={classes.ratingBlock}>
      <Text className={classes.ratingCategory}>
        {text} <span className={classes.required}>*</span>
      </Text>
      <CustomRating
        readOnly={false}
        inputProps={inputProps}
        errorFlag={errorFlag}
      />
      {errorFlag && (
        <Text className={classes.errMsgRating}>Please fill in a value</Text>
      )}
    </div>
  );
}

function ReviewForm({
  submitReview,
  readOnly,
  reviewInfo,
  companiesList,
}: ReviewFormProps) {
  const {
    opened,
    toggleOpened,
    customReviewForm,
    handleOnSubmit,
    openRecaptcha,
    overallMissing,
    difficultyMissing,
    responsivenessMissing,
    errorInputsMsg,
  } = useReviewForm(submitReview, companiesList, reviewInfo);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <Container size="md" className={classes.wrapper}>
      <form>
        <div className="flex justify-between">
          <Select
            withAsterisk={!readOnly}
            label="Company"
            placeholder="Select Company"
            data={[...companiesList, "Other"]}
            searchable
            {...customReviewForm.getInputProps("company")}
            className="mt-5 w-2/4"
            readOnly={readOnly}
          />

          <TextInput
            label="Date Created"
            placeholder="Today's Date"
            {...customReviewForm.getInputProps("dateCreated")}
            className="mt-5 w-1/4"
            readOnly
          />
        </div>

        {!readOnly && customReviewForm.values.company === "Other" && (
          <TextInput
            withAsterisk
            label="Other"
            placeholder="Enter Company Below"
            {...customReviewForm.getInputProps("companyOther")}
            className="mt-5"
          />
        )}

        <TextInput
          withAsterisk={!readOnly}
          label="Job Position"
          placeholder="Job Position"
          {...customReviewForm.getInputProps("position")}
          className="mt-5"
          readOnly={readOnly}
        />

        <TextInput
          withAsterisk={!readOnly}
          label="Application URL"
          placeholder="Application URL"
          {...customReviewForm.getInputProps("url")}
          className="mt-5"
          readOnly={readOnly}
        />

        <RatingsBlock
          text={"Overall Experience"}
          errorFlag={overallMissing}
          inputProps={customReviewForm.getInputProps("rating")}
        />

        <RatingsBlock
          text={"Difficulty"}
          errorFlag={difficultyMissing}
          inputProps={customReviewForm.getInputProps("difficulty")}
        />

        <RatingsBlock
          text={"Responsiveness"}
          errorFlag={responsivenessMissing}
          inputProps={customReviewForm.getInputProps("responsiveness")}
        />

        <div className={classes.ratingBlock}>
          <Textarea
            label="Detailed Review"
            description="Your experience"
            placeholder="Enter details about your experience"
            maxLength={500}
            {...customReviewForm.getInputProps("detailed")}
            readOnly={readOnly}
          />
          <div dir="rtl">
            <p
              className={
                `text-xs ` +
                ((customReviewForm.getInputProps("detailed").value as string)
                  .length > 400 && "text-red-600")
              }
            >
              {
                (customReviewForm.getInputProps("detailed").value as string)
                  .length
              }
              /500
            </p>
          </div>
        </div>

        <Checkbox
          mt="md"
          label="I got the job"
          {...customReviewForm.getInputProps("gotTheJob", { type: "checkbox" })}
          readOnly={readOnly}
        />

        {!readOnly && (
          <Checkbox
            mt="md"
            label="I agree to have my review stored for data purposes"
            {...customReviewForm.getInputProps("consent", { type: "checkbox" })}
          />
        )}

        <TextInput
          label="Personal Thoughts"
          placeholder="Personal thoughts on the company?"
          {...customReviewForm.getInputProps("honey")}
          className="hidden"
        />

        {!readOnly && (
          <Stack justify="flex-end" mt="md" align="flex-end">
            <Popover
              trapFocus
              position="bottom"
              withArrow
              opened={opened}
              onClose={toggleOpened}
            >
              <Popover.Target>
                <Button onClick={openRecaptcha}>Submit</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={async () => {
                    await handleOnSubmit();
                    recaptchaRef?.current?.reset();
                  }}
                  ref={recaptchaRef}
                />
              </Popover.Dropdown>
            </Popover>
            {errorInputsMsg && (
              <Text className={classes.errMsg}>
                Please make sure your fields are filled in correctly.
              </Text>
            )}
          </Stack>
        )}
      </form>
    </Container>
  );
}

export default ReviewForm;
