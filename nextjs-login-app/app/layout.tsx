import "./globals.css";
import React from "react";
import Providers from "../components/Providers";

export const metadata = {
  title: "NextJS Login App",
  description: "Login + Forgot Password",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
