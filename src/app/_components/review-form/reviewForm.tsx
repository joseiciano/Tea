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
import { z } from "zod";
import { type Review } from "~/types/Review.types";

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

function ReviewForm() {
  const form = useForm({
    initialValues: {
      company: "",
      consent: true,
      position: "",
      url: "",
      rating: 0,
      difficulty: 0,
      responsiveness: 0,
      detailed: "",
      gotTheJob: false,
    },
  });

  const handleOnSubmit = (values: Review) => {
    console.log("Values", values);
  };

  return (
    <form
      onSubmit={form.onSubmit((values: Review) => {
        handleOnSubmit(values);
      })}
    >
      <Select
        withAsterisk
        label="Company"
        placeholder="Select Company"
        data={["React", "Angular", "Vue", "Svelte"]}
        searchable
        {...form.getInputProps("company")}
        className="mt-5"
      />

      <TextInput
        withAsterisk
        label="Job Position"
        placeholder="Job Position"
        {...form.getInputProps("position")}
        className="mt-5"
      />

      <TextInput
        withAsterisk
        label="Application URL"
        placeholder="Application URL"
        {...form.getInputProps("url")}
        className="mt-5"
      />

      <RatingInput name="Review" inputProps={form.getInputProps("review")} />

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
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

export default ReviewForm;
