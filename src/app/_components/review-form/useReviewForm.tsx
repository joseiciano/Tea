import { type Review } from "@prisma/client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { type ReviewForm } from "~/types/Review.types";
import { ProfanityError } from "~/types/errors";

export function useReviewForm(
  submitReview: (values: ReviewForm) => Promise<Review>,
  companiesList: string[],
  reviewInfo?: Review,
) {
  const [opened, setOpened] = useState(false);
  const [errorInputsMsg, setErrorInputsMsg] = useState(false);
  const [responsivenessMissing, setResponsivenessMissing] = useState(false);
  const [overallMissing, setOverallMissing] = useState(false);
  const [difficultyMissing, setDifficultyMissing] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const formCheck = () => {
    customReviewForm.validate();
    const isValid = customReviewForm.isValid();

    if (!isValid) {
      setDifficultyMissing(!customReviewForm.isValid("difficulty"));
      setOverallMissing(!customReviewForm.isValid("rating"));
      setResponsivenessMissing(!customReviewForm.isValid("responsiveness"));

      setErrorInputsMsg(
        !customReviewForm.isValid("difficulty") ||
          !customReviewForm.isValid("rating") ||
          !customReviewForm.isValid("responsiveness"),
      );
    }

    return isValid;
  };

  const openRecaptcha = () => {
    if (formCheck()) {
      toggleOpened();
    }
  };

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

  const customReviewForm = useForm<ReviewForm>({
    initialValues: {
      company: getCompanyInitialForm(),
      companyOther: "",
      consent: true,
      position: reviewInfo?.position ?? "",
      dateCreated: dayjs().format("MM-DD-YYYY"),
      url: reviewInfo?.url ?? "",
      rating: reviewInfo?.rating ?? 0,
      difficulty: reviewInfo?.difficulty ?? 0,
      responsiveness: reviewInfo?.responsiveness ?? 0,
      detailed: reviewInfo?.detailed ?? "",
      gotTheJob: reviewInfo?.gotTheJob ?? false,
      honey: "",
    },

    validate: {
      company: (value) =>
        value.length > 0 ? null : "Section cannot be left blank",
      position: (value) =>
        value.length > 0 ? null : "Section cannot be left blank",
      url: (value) =>
        value.match(
          new RegExp(
            "^(https?:\\/\\/)?" + // protocol
              "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
              "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
              "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
              "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
              "(\\#[-a-z\\d_]*)?$", // fragment locator
            "i",
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

  const handleOnSubmit = async () => {
    const values = customReviewForm.values;

    try {
      if (formCheck()) {
        const result = await submitReview(values);

        console.log("RESULT", { result, router });
        // router.push("/review?id=" + result.id);
      }
    } catch (err) {
      if (err instanceof ProfanityError) {
        console.log("PROFERR", err);
      } else {
        console.log("GENERAL ERR", err);
      }
    } finally {
      toggleOpened();
    }
  };

  return {
    opened,
    toggleOpened,
    customReviewForm,
    handleOnSubmit,
    openRecaptcha,
    errorInputsMsg,
    overallMissing,
    responsivenessMissing,
    difficultyMissing,
  };
}
