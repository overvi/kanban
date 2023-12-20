import { Box, Button, Heading } from "@radix-ui/themes";
import React from "react";
import { FaDatabase } from "react-icons/fa6";

const Empty = () => {
  return (
    <>
      <Box className=" m-auto space-y-7 justify-center h-[70vh] flex w-[160vh] items-center flex-col">
        <FaDatabase size="55" />
        <Box className="space-y-7 flex flex-col items-center">
          <Heading className="font-semibold text-xl">
            You dont have any Boards Start by Creating one
          </Heading>
          <label htmlFor="my_modal_7" className="btn font-bold">
            Create New Board
          </label>
        </Box>
      </Box>
    </>
  );
};

export default Empty;
