"use client";

import { useBearStore } from "@/app/zustand/useCurrentBoard";
import { Board } from "@prisma/client";
import { Box, Flex, Heading as Head, Text } from "@radix-ui/themes";
import { NavBarModal } from "../Modals/Modals";
import Image from "next/image";
import myself from "@/public/man1.jpg";

const Heading = ({ boards }: { boards: Board[] }) => {
  const { currentBoard } = useBearStore();
  const title = boards?.find((board) => board.id === currentBoard!);
  return (
    <Flex className="flex gap-3 items-center">
      <Box className="flex items-center gap-3 ">
        <Head className="font-semibold text-base Heading  md:text-3xl text-opposite ">
          {title?.title || "Nothing Here"}
        </Head>
      </Box>

      <NavBarModal boards={boards} />
    </Flex>
  );
};

export default Heading;
