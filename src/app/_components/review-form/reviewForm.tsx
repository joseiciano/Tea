"use client";

import { type Review } from ".prisma/client";
import {
  Button,
  Checkbox,
  Container,
  Group,
  Popover,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { type ReviewForm } from "~/types/Review.types";
import { useReviewForm } from "./useReviewForm";
import CustomRating from "../custom-rating/CustomRating";
import classes from "./ReviewForm.module.css";

interface ReviewFormProps {
  submitReview: (values: ReviewForm) => Promise<Review>;
  readOnly?: boolean;
  reviewInfo?: Review;
  companiesList: string[];
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
  } = useReviewForm(submitReview, companiesList, reviewInfo);

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

        <div className="mt-5">
          <p>Overall Experience</p>
          <CustomRating
            readOnly={false}
            inputProps={customReviewForm.getInputProps("rating")}
          />
        </div>

        <div className="mt-5">
          <p>Difficulty</p>
          <CustomRating
            readOnly={false}
            inputProps={customReviewForm.getInputProps("difficulty")}
          />
        </div>

        <div className="mt-5">
          <p>Responsiveness</p>
          <CustomRating
            readOnly={false}
            inputProps={customReviewForm.getInputProps("responsiveness")}
          />
        </div>

        <div className="mt-5">
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
          <Group justify="flex-end" mt="md">
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
                  onChange={async () => handleOnSubmit()}
                />
              </Popover.Dropdown>
            </Popover>
          </Group>
        )}
      </form>
    </Container>
  );
}

export default ReviewForm;
