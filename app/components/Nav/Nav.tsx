import { Board } from "@prisma/client";
import { Box, Heading } from "@radix-ui/themes";
import { ReactNode } from "react";
import ToggleColorMode from "../../helpers/ToggleColorMode";
import Options from "./Options";
import { clerkClient } from "@clerk/nextjs/server";

interface Props {
  children?: ReactNode;
  boards: Board[];
}

const Nav = ({ boards, children }: Props) => {
  return (
    <>
      <Box className="mt-4 ">
        <Heading className="font-bold text-gray-400  uppercase text-[.8rem]  tracking-[.15rem]">
          All Boards ({boards?.length})
        </Heading>
        <Options boards={boards} />
      </Box>
      <Box className="min-w-[15rem] py-5 space-y-5 self-center">
        <ToggleColorMode />
        {children}
      </Box>
    </>
  );
};

export default Nav;
