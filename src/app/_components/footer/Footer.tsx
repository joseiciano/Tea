"use client";
import { Container, Group, Anchor, type MantineSize } from "@mantine/core";
import classes from "./Footer.module.css";
import Logo from "../logo/Logo";

const links = [
  { link: "https://forms.gle/m2n2sbhuTEajUnop6", label: "Feedback" },
  { link: "/about", label: "About" },
  // { link: "#", label: "Blog" },
  // { link: "#", label: "Careers" },
];

export function Footer({ size = "md" }: { size: MantineSize }) {
  const items = links.map((link) => (
    <Anchor<"a"> c="dimmed" key={link.label} href={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container size={size} className={classes.inner}>
        <Logo />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
