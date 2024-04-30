import { Rating, rem } from "@mantine/core";
import { IconCoffee } from "@tabler/icons-react";
import { type GetInputPropsReturnType } from "node_modules/@mantine/form/lib/types";
import React from "react";

const getIconStyle = (color?: string) => ({
  width: rem(24),
  height: rem(24),
  color: color ? `var(--mantine-color-${color}-7)` : undefined,
});

function CustomRating({
  value,
  readOnly,
  inputProps,
}: {
  value?: number;
  readOnly: boolean;
  inputProps?: GetInputPropsReturnType;
}) {
  return (
    <Rating
      name="rating"
      size="sm"
      fractions={2}
      value={value}
      readOnly={readOnly}
      {...inputProps}
      emptySymbol={<IconCoffee style={getIconStyle()} />}
      fullSymbol={<IconCoffee style={getIconStyle("yellow")} />}
    />
  );
}

export default CustomRating;
