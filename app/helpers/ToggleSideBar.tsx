"use client";

import eye from "@/public/icon-hide-sidebar.svg";
import show from "@/public/icon-show-sidebar.svg";
import { IconButton } from "@radix-ui/themes";
import Image from "next/image";

export const ToggleSideBar = () => {
  const ToggleSideBar = () => {
    const navBar = document.querySelector(".nav");
    const showSide = document.querySelector(".showSide");
    const todos = document.querySelector(".todos");
    const sideBar = document.querySelector(".side");
    const board = document.querySelector(".board-container");

    navBar?.classList.add("hide");
    showSide?.classList.remove("opacity-0");
    todos?.classList.add("w-screen");
    sideBar?.classList.remove("md:block");
    board?.classList.add("!left-0");
  };
  return (
    <IconButton
      onClick={ToggleSideBar}
      className=" flex items-center gap-2 font-semibold"
      variant="ghost"
      highContrast
    >
      <Image src={eye} alt="" />
      Hide Sidebar
    </IconButton>
  );
};

export const ToggleShowSide = () => {
  const ToggleSideBar = () => {
    const navBar = document.querySelector(".nav");
    const showSide = document.querySelector(".showSide");
    const sideBar = document.querySelector(".side");
    const todos = document.querySelector(".todos");
    const board = document.querySelector(".board-container");
    navBar?.classList.remove("hide");
    showSide?.classList.add("opacity-0");
    sideBar?.classList.add("md:block");
    todos?.classList.remove("w-screen");
    board?.classList.remove("!left-0");
  };

  return (
    <IconButton
      onClick={ToggleSideBar}
      className="showSide  transition-opacity duration-1000  flex opacity-0 items-center gap-3 bg-purple-1 p-4  absolute bottom-7 rounded-r-3xl"
    >
      <Image src={show} alt={""} />
    </IconButton>
  );
};

export default ToggleSideBar;
