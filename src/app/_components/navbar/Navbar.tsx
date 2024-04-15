"use client";
import React from "react";
import { useState } from "react";
import {
  Container,
  Group,
  Burger,
  Drawer,
  Divider,
  Button,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
import { type Session } from "next-auth";
import { usePathname } from "next/navigation";
import ColorToggle from "../color-toggle/colorToggle";

const links = [
  { link: "/", label: "Home" },
  { link: "/companies", label: "Companies" },
  { link: "/submit-review", label: "Make a Review" },
  { link: "/api/auth/signin", label: "Sign In" },
  { link: "/api/auth/signout", label: "Sign Out" },
];

export default function Navbar({ session }: { session: Session | null }) {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();
  const [active, setActive] = useState(
    links.find(({ link }) => link === pathname)!.link,
  );

  const items = links
    .filter(({ label }) => label !== (session ? "Sign In" : "Sign Out"))
    .map(({ label, link }) => (
      <a
        key={label}
        href={link}
        className={classes.link}
        data-active={active === link || undefined}
        onClick={(event) => {
          // event.preventDefault();
          setActive(link);
          console.log("Route to", link);
        }}
      >
        {label}
      </a>
    ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <div>Title Here</div>
        <Group gap={5} visibleFrom="xs">
          {items}
          <ColorToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>

      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {items}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </header>
  );
}
