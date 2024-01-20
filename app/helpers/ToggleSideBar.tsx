"use client";

import eye from "@/public/icon-hide-sidebar.svg";
import show from "@/public/icon-show-sidebar.svg";
import { IconButton } from "@radix-ui/themes";
import Image from "next/image";
import toggleSidebar from "./utils";

export const ToggleSideBar = () => {
  const handleClick = () => {
    toggleSidebar(false);
  };
  return (
    <IconButton
      id="hide-side"
      onClick={handleClick}
      className="  flex items-center gap-2 font-semibold"
      variant="ghost"
      highContrast
    >
      <Image src={eye} alt="" />
      Hide Sidebar
    </IconButton>
  );
};

export const ToggleShowSide = () => {
  const handleClick = () => {
    toggleSidebar(true);
  };

  return (
    <IconButton
      id="show-side"
      onClick={handleClick}
      className="showSide  transition-opacity duration-1000  flex opacity-0 items-center gap-3 bg-purple-1 p-4  absolute bottom-7 rounded-r-3xl"
    >
      <Image src={show} alt={""} />
    </IconButton>
  );
};

export default ToggleSideBar;
