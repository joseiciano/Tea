"use client";

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
import { type GetInputPropsReturnType } from "node_modules/@mantine/form/lib/types";
import React from "react";
import { type ReviewForm } from "~/types/Review.types";

function RatingInput({
  name,
  inputProps,
}: {
  name: string;
  inputProps: GetInputPropsReturnType;
}) {
  return (
    <div className="mt-5">
      <p>{name}</p>
      <Rating name="rating" size="lg" fractions={2} {...inputProps} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReviewForm({
  submitReview,
}: {
  submitReview: (values: ReviewForm) => Promise<ReviewForm>;
}) {
  const form = useForm<ReviewForm>({
    initialValues: {
      company: "",
      companyOther: "",
      consent: true,
      position: "",
      url: "",
      rating: 0,
      difficulty: 0,
      responsiveness: 0,
      detailed: "",
      gotTheJob: false,
    },

    validate: {
      company: (value) => value.length > 0,
      position: (value) => value.length > 0,
      url: (value) =>
        value.match(
          new RegExp(
            "/^((https?)://)?([w|W]{3}.)+[a-zA-Z0-9-.]{3,}.[a-zA-Z]{2,}(.[a-zA-Z]{2,})?$/",
          ),
        ),
      rating: (value) => value > 0 && value < 6,
      difficulty: (value) => value > 0 && value < 6,
      responsiveness: (value) => value > 0 && value < 6,
      detailed: (value) => value.length > 0,
    },
  });

  const handleOnSubmit = async (values: ReviewForm) => {
    const result = await submitReview(values);

    console.log("Result of api call", result);
  };

  return (
    <form>
      <Select
        withAsterisk
        label="Company"
        placeholder="Select Company"
        data={["React", "Angular", "Vue", "Svelte", "Other"]}
        searchable
        {...form.getInputProps("company")}
        className="mt-5"
        error="Section cannot be left blank."
      />

      {form.values.company === "Other" && (
        <TextInput
          withAsterisk
          label="Other"
          placeholder="Enter Company Below"
          {...form.getInputProps("companyOther")}
          className="mt-5"
          error="Section cannot be left blank."
        />
      )}

      <TextInput
        withAsterisk
        label="Job Position"
        placeholder="Job Position"
        {...form.getInputProps("position")}
        className="mt-5"
        error="Section cannot be left blank."
      />

      <TextInput
        withAsterisk
        label="Application URL"
        placeholder="Application URL"
        {...form.getInputProps("url")}
        className="mt-5"
        error="Invalid URL."
      />

      <RatingInput name="Review" inputProps={form.getInputProps("rating")} />

      <RatingInput
        name="Difficulty"
        inputProps={form.getInputProps("difficulty")}
      />

      <RatingInput
        name="Responsiveness"
        inputProps={form.getInputProps("responsiveness")}
      />

      <div className="mt-5">
        <Textarea
          label="Detailed Review"
          description="Your experience"
          placeholder="Enter details about your experience"
          maxLength={500}
          {...form.getInputProps("detailed")}
          error="Section cannot be left blank."
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
      />

      <Checkbox
        mt="md"
        label="I agree to have my review stored for data purposes"
        {...form.getInputProps("consent", { type: "checkbox" })}
        error="User consent is required."
      />

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
    </form>
  );
}

export default ReviewForm;
