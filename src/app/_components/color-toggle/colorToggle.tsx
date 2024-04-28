"use client";
import React from "react";
import cx from "clsx";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import classes from "./colorToggle.module.css";

function ColorToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => {
          console.log("ColorSchema");
          setColorScheme(computedColorScheme === "light" ? "dark" : "light");
        }}
        variant="default"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1} />
      </ActionIcon>
    </Group>
  );
}

export default ColorToggle;
