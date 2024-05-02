import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/form";
import "@tabler/icons-react";

import "@mantine/colors-generator";

import { Inter } from "next/font/google";

import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "JustTea",
  description: "Spill the Tea",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const theme = createTheme({
  primaryColor: "red",
  white: "#f6efec",
  colors: {
    // blue: generateColors("#375EAC"),b
    blue: [
      "#e0ffff",
      "#ccfbff",
      "#9cf5ff",
      "#68f0fe",
      "#44eafe",
      "#30e7fe",
      "#1ee7fe",
      "#00cde3",
      "#00b7ca",
      "#009eb1",
    ],
    red: [
      "#ffede6",
      "#ffdbd1",
      "#f8b6a3",
      "#f28d71",
      "#ed6b47",
      "#eb562c",
      "#eb4a1e",
      "#d13b12",
      "#bb320d",
      "#a32805",
    ],
    brown: [
      "#f8f2f1",
      "#eae3e2",
      "#d7c3c0",
      "#c4a09b",
      "#b5837c",
      "#ac7168",
      "#a8675d",
      "#93564e",
      "#844c43",
      "#754038",
    ],
  },

  spacing: {
    xxs: "0.4rem",
  },
  // fontFamily: "open sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
