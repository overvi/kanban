"use client";

import React from "react";
import logoLight from "@/public/logo-light.svg";
import logoDark from "@/public/logo-dark.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Box } from "@radix-ui/themes";

const ChooseLogo = () => {
  const { theme } = useTheme();
  if (theme === "light")
    return (
      <Box className="p-[2.32rem] hidden md:block basis-[26.5%] border-r border-b border-borders-100">
        <Image src={logoDark} alt=""></Image>
      </Box>
    );
  return (
    <Box className="p-[2.32rem] hidden md:block  bg-gray-2 basis-[26.5%] border-r border-b border-borders-100">
      <Image className="max-w-full  " src={logoLight} alt=""></Image>
    </Box>
  );
};

export default ChooseLogo;
