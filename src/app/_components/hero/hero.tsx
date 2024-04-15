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
            <span className={classes.highlight}>View</span> the{" "}
            <span className={classes.highlight}>&apos;View</span>
          </Title>
          <Text c="dimmed" mt="md">
            Know what you&apos;re getting into? Review the interview process for
            a company you&apos;re applying for.
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
              <b>Know the Game</b> – Be able to prep specifically for the job.
            </List.Item>
            <List.Item>
              <b>Yearly Updated</b> – Stay fresh and up-to-date with the most
              recent info.
            </List.Item>
            <List.Item>
              <b>Privacy</b> – Reviews stay anonymous. We won&apos;t publicly
              reveal your information.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Company Reviews
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Submit a Review
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
