import { Rating } from "@mantine/core";
import { type GetInputPropsReturnType } from "node_modules/@mantine/form/lib/types";
import classes from "./RatingInput.module.css";

interface RatingInputProps {
  name: string;
  inputProps: GetInputPropsReturnType;
  readOnly?: boolean;
}

function RatingInput({ name, inputProps, readOnly }: RatingInputProps) {
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

export { RatingInput };
