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
import Link from "next/link";
import { type Session } from "next-auth";

export function HeroBullets({ session }: { session: Session | null }) {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          {/* Alternative Title: Brewing Better INterviews */}
          {/* Alternative Title: Better Brewing INterviews */}
          <Title className={classes.title}>Spill the Tea</Title>
          <Text c="dimmed" mt="md">
            Review the interview process for a company you&apos;re applying for.
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
              <b>Be Prepped</b> – Be able to prep specifically for the job.
            </List.Item>
            <List.Item>
              <b>Stay up to date</b> – Stay fresh with the most recent info.
            </List.Item>
            <List.Item>
              <b>Privacy</b> – Reviews stay anonymous. We won&apos;t publicly
              reveal your information.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Read Reviews
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              {!session && <Link href="/api/auth/signin">Submit a Review</Link>}
              {session && <Link href="submit-review">Submit a Review</Link>}
            </Button>
          </Group>
        </div>
        <Image
          visibleFrom="md"
          className="h-450 w-450"
          alt="My image"
          src="/programmer.svg"
        />
      </div>
    </Container>
  );
}
