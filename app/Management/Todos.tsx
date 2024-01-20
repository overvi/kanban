"use client";

import plus from "@/public/icon-add-task-mobile.svg";
import { Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import DropDown from "../components/Board/DropDown";
import { AddTaskModal } from "../components/Modals/AddTaskModal";
import Heading from "../components/Nav/Heading";
import { useGetColumns } from "../hooks/useColumns";
import { BoardFull } from "../types/board";
import { useBearStore } from "../zustand/useCurrentBoard";

const Todos = ({ boards }: { boards: BoardFull[] }) => {
  const { currentBoard } = useBearStore();
  const { data } = useGetColumns();
  const currentColumn = boards.find((board) => board.id == currentBoard);
  return (
    <>
      <Box className="basis-full gap-5 items-center border-b  bg-gray-2  border-borders-100 p-6  flex justify-between ">
        <Heading boards={boards} />

        <Box className="flex gap-2 items-center  ">
          <label
            id="add-task"
            htmlFor={data?.columns.length ? "create" : "NAN"}
            className="py-3 gap-2 cursor-pointer border-0 font-semibold  items-center  flex bg-purple-1 text-white px-5 rounded-full"
          >
            <Image className="w-full md:w-2 " src={plus} alt="" />
            <Text
              htmlFor="create"
              className="hidden md:block py-[0.5rem] px-[1rem] md:py-0 md:px-[.5rem]"
            >
              Add To Tasks
            </Text>
          </label>
          {!!boards.length && <DropDown boards={boards} />}
        </Box>
      </Box>
      <AddTaskModal board={currentColumn} modal="create" />
    </>
  );
};

export default Todos;
