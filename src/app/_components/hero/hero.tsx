"use client";

import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";

import classes from "./hero.module.css";

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Review <span className={classes.highlight}>Before</span> the <br />{" "}
            Interview
          </Title>
          <Text c="dimmed" mt="md">
            Be able to review hundreds of companies for their interview process.
            Know how to prep for your specific job.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                {/* <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                /> */}
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>TypeScript based</b> – build type safe applications, all
              components and hooks export types
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you
              can use Mantine in any project
            </List.Item>
            <List.Item>
              <b>A Brick Door</b> – We will not make your personal info public
              without warning you.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Source code
            </Button>
          </Group>
        </div>
        <Image
          visibleFrom="md"
          style={{ height: 450, width: 450 }}
          alt="My image"
          src="/programmer.svg"
        />
      </div>
    </Container>
  );
}
