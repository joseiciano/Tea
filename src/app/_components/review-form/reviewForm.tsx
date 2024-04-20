"use client";

import { type Review } from ".prisma/client";
import {
  Button,
  Checkbox,
  Group,
  Rating,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { type GetInputPropsReturnType } from "node_modules/@mantine/form/lib/types";
import React, { useEffect, useState } from "react";
import { ReviewFormSchema, type ReviewForm } from "~/types/Review.types";

function RatingInput({
  name,
  inputProps,
  readOnly = false,
}: {
  name: string;
  inputProps: GetInputPropsReturnType;
  readOnly: boolean;
}) {
  return (
    <div className="mt-5">
      <p>{name}</p>
      <Rating
        name="rating"
        size="lg"
        fractions={2}
        {...inputProps}
        readOnly={readOnly}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReviewForm({
  submitReview,
  readOnly = false,
  reviewInfo,
  companiesList,
}: {
  submitReview: (values: ReviewForm) => Promise<Review>;
  readOnly?: boolean;
  reviewInfo?: Review;
  companiesList: string[];
}) {
  const router = useRouter();
  const getCompanyInitialForm = () => {
    if (!reviewInfo?.company) {
      return "";
    }
    if (companiesList.find((comp) => comp === reviewInfo?.company)) {
      return reviewInfo?.company;
    }
    return "Other";
  };

  const form = useForm<ReviewForm>({
    initialValues: {
      company: getCompanyInitialForm(),
      companyOther: "",
      consent: true,
      position: (reviewInfo?.position as string) ?? "",
      dateCreated: dayjs().format("MM-DD-YYYY"),
      url: reviewInfo?.url ?? "",
      rating: reviewInfo?.rating ?? 0,
      difficulty: reviewInfo?.difficulty ?? 0,
      responsiveness: reviewInfo?.responsiveness ?? 0,
      detailed: reviewInfo?.detailed ?? "",
      gotTheJob: reviewInfo?.gotTheJob ?? false,
    },

    validate: {
      company: (value) =>
        value.length > 0 ? null : "Section cannot be left blank",
      position: (value) =>
        value.length > 0 ? null : "Section cannot be left blank",
      url: (value) =>
        value.match(
          new RegExp(
            "/^((https?)://)?([w|W]{3}.)+[a-zA-Z0-9-.]{3,}.[a-zA-Z]{2,}(.[a-zA-Z]{2,})?$/",
          ),
        )
          ? null
          : "Invalid URL provided",
      rating: (value) =>
        value > 0 && value < 6 ? null : "Please provide a rating",
      difficulty: (value) =>
        value > 0 && value < 6 ? null : "Please provide a rating",
      responsiveness: (value) =>
        value > 0 && value < 6 ? null : "Please provide a rating",
      detailed: (value) =>
        value.length > 0
          ? null
          : "Please provide a description of your experience",
      consent: (value) => (value === true ? null : "User consent is required"),
    },
  });

  const handleOnSubmit = async (values: ReviewForm) => {
    form.validate();
    if (ReviewFormSchema.parse(form)) {
      const result = await submitReview(values);
      router.push("/review?id=" + result.id);
    }
  };

  return (
    <form>
      <div className="flex justify-between">
        <Select
          withAsterisk={!readOnly}
          label="Company"
          placeholder="Select Company"
          data={[...companiesList, "Other"]}
          searchable
          {...form.getInputProps("company")}
          className="mt-5 w-2/4"
          readOnly={readOnly}
        />

        <TextInput
          label="Date Created"
          placeholder="Today's Date"
          {...form.getInputProps("dateCreated")}
          className="mt-5 w-1/4"
        />
      </div>

      {!readOnly && form.values.company === "Other" && (
        <TextInput
          withAsterisk
          label="Other"
          placeholder="Enter Company Below"
          {...form.getInputProps("companyOther")}
          className="mt-5"
        />
      )}

      <TextInput
        withAsterisk={!readOnly}
        label="Job Position"
        placeholder="Job Position"
        {...form.getInputProps("position")}
        className="mt-5"
        readOnly={readOnly}
      />

      <TextInput
        withAsterisk={!readOnly}
        label="Application URL"
        placeholder="Application URL"
        {...form.getInputProps("url")}
        className="mt-5"
        readOnly={readOnly}
      />

      <RatingInput
        name="Review"
        inputProps={form.getInputProps("rating")}
        readOnly={readOnly}
      />

      <RatingInput
        name="Difficulty"
        inputProps={form.getInputProps("difficulty")}
        readOnly={readOnly}
      />

      <RatingInput
        name="Responsiveness"
        inputProps={form.getInputProps("responsiveness")}
        readOnly={readOnly}
      />

      <div className="mt-5">
        <Textarea
          label="Detailed Review"
          description="Your experience"
          placeholder="Enter details about your experience"
          maxLength={500}
          {...form.getInputProps("detailed")}
          readOnly={readOnly}
        />
        <div dir="rtl">
          <p
            className={
              `text-xs ` +
              ((form.getInputProps("detailed").value as string).length > 400 &&
                "text-red-600")
            }
          >
            {(form.getInputProps("detailed").value as string).length}/500
          </p>
        </div>
      </div>

      <Checkbox
        mt="md"
        label="I got the job"
        {...form.getInputProps("gotTheJob", { type: "checkbox" })}
        readOnly={readOnly}
      />

      {!readOnly && (
        <Checkbox
          mt="md"
          label="I agree to have my review stored for data purposes"
          {...form.getInputProps("consent", { type: "checkbox" })}
        />
      )}

      {!readOnly && (
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            onClick={async (event) => {
              event.preventDefault();
              await handleOnSubmit(form.values);
            }}
          >
            Submit
          </Button>
        </Group>
      )}
    </form>
  );
}

export default ReviewForm;
