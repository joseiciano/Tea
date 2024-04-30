"use client";
import React from "react";
import { useState } from "react";
import {
  Container,
  Group,
  Burger,
  Drawer,
  Divider,
  ScrollArea,
  rem,
  Select,
  type MantineSize,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
import { type Session } from "next-auth";
import { usePathname } from "next/navigation";
import ColorToggle from "../color-toggle/colorToggle";
import Link from "next/link";
import { useForm } from "@mantine/form";
import Logo from "../logo/Logo";
import { useRouter } from "next/navigation";

const links = [
  { link: "/companies", label: "Companies" },
  { link: "/submit-review", label: "Make a Review" },
  { link: "/api/auth/signin", label: "Sign In" },
  { link: "/api/auth/signout", label: "Sign Out" },
];

function SearchBar({ data }: { data: string[] }) {
  const router = useRouter();
  const companySearch = useForm({
    initialValues: {
      company: "",
    },
  });

  const handleOnSelect = async (company: string | null) => {
    companySearch.reset();
    console.log("GOGOGOGOGO");
    router.push(`/companies?company=${company}&page=1`);
  };

  return (
    <Select
      placeholder="Enter your search here"
      data={data}
      searchable
      {...companySearch.getInputProps("company")}
      className="mr-3"
      onChange={handleOnSelect}
    />
  );
}

export default function Navbar({
  session,
  companiesList,
  size = "md",
}: {
  session: Session | null;
  companiesList: string[];
  size: MantineSize;
}) {
  const [opened, { toggle }] = useDisclosure(false);

  const pathname = usePathname();
  const [active, setActive] = useState(
    links.find(({ link }) => link === pathname)?.link,
  );

  const items = links
    .filter(({ label }) => label !== (session ? "Sign In" : "Sign Out"))
    .map(({ label, link }) => (
      <Link
        key={label}
        href={link}
        className={classes.link}
        data-active={active === link || undefined}
        onClick={(_) => {
          setActive(link);
        }}
      >
        {label}
      </Link>
    ));

  return (
    <header className={classes.header}>
      <Container size={size} className={classes.inner}>
        <Logo />

        <Group gap={5} visibleFrom="sm">
          <SearchBar data={companiesList} />
          {items}
          <ColorToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Container>

      <Drawer.Root
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="lg"
        hiddenFrom="sm"
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Logo />
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
              <Divider my="sm" />
              <SearchBar data={companiesList} />

              {items}

              <Divider my="sm" />
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </header>
  );
}
