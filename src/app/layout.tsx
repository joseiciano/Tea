import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/form";

import "@mantine/colors-generator";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Testing T3 Stack",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const theme = createTheme({
  primaryColor: "red",
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
  },

  // fontFamily: "open sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <MantineProvider theme={theme}>
            <ColorSchemeScript />
            {children}
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
