"use client";

import { ReactNode } from "react";

import ScrollContainer from "react-indiana-drag-scroll";

const Scroll = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollContainer
      style={{ scrollbarWidth: "auto", overflowY: "auto" }}
      ignoreElements=".drag  , .modal"
      className=" scroll-container min-h-[calc(100vh-6.31rem)] todos flex bg-gray-3 relative "
    >
      {children}
    </ScrollContainer>
  );
};

export default Scroll;
