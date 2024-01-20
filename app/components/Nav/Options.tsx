"use client";

import { useBearStore } from "@/app/zustand/useCurrentBoard";
import { Board } from "@prisma/client";
import { Box, Button, Container, Text } from "@radix-ui/themes";
import { useEffect } from "react";

const Options = ({ boards }: { boards: Board[] }) => {
  const { setCurrentBoard, currentBoard } = useBearStore();
  useEffect(() => {
    setCurrentBoard();
    useBearStore.persist.rehydrate();
  }, []);
  return (
    <>
      <Box className="space-y-6 py-8 ">
        {boards?.map((option, index) => (
          <Container
            onClick={() => {
              setCurrentBoard(option.id);
            }}
            className="relative z-0  board-content "
          >
            <Button
              className={`board 
               text-gray-400 ${
                 currentBoard === option.id && "active"
               } board  w-full focus:pointer-events-none items-center font-semibold   gap-3 flex  board-${
                option.id
              }`}
            >
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="active-path fill-gray-1"
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                />
              </svg>

              <Text className="sidebar-option">{option.title}</Text>
            </Button>
          </Container>
        ))}
        <label
          htmlFor="my_modal_7"
          className={`cursor-pointer text-purple-1 items-center font-semibold epic gap-3 flex `}
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              className="option-svg fill-purple-1"
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
            />
          </svg>

          <Text className="sidebar-option">+Create New Board</Text>
        </label>
      </Box>
    </>
  );
};

export default Options;
