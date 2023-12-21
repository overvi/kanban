"use client";
import { ThemeProvider } from "next-themes";
import React, { PropsWithChildren } from "react";

const DarkMode = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

export default DarkMode;
