"use client";

import plus from "@/public/icon-add-task-mobile.svg";
import { Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import DropDown from "../components/Board/DropDown";
import { AddTaskModal } from "../components/Modals/AddTaskModal";
import AuthStatus from "../components/Nav/AuthStatus";
import Heading from "../components/Nav/Heading";
import AuthToast, { AuthToastCompoent } from "../helpers/AuthToast";
import { useGetColumns } from "../hooks/useColumns";
import { BoardFull } from "../types/board";
import { useBearStore } from "../zustand/useCurrentBoard";
import { useUser } from "@clerk/nextjs";

const Todos = ({ boards }: { boards: BoardFull[] }) => {
  const { currentBoard } = useBearStore();
  const { data } = useGetColumns();
  const { isSignedIn } = useUser();
  const currentColumn = boards.find((board) => board.id == currentBoard);
  return (
    <>
      <Box className="basis-full gap-5 items-center border-b  bg-gray-2  border-borders-100 p-6  flex justify-between ">
        <Heading boards={boards} />

        <Box className="flex gap-5 items-center  ">
          <AuthStatus />

          <AuthToast>
            <label
              id="add-task"
              htmlFor={data?.columns?.length && isSignedIn ? "create" : "NAN"}
              className="py-3 gap-2 cursor-pointer border-0 font-semibold  items-center  flex bg-purple-1 text-white px-5 rounded-full"
            >
              <Image className="w-full md:w-2 " src={plus} alt="" />
              <Text className="hidden md:block py-[0.5rem] px-[1rem] md:py-0 md:px-[.5rem]">
                Add To Tasks
              </Text>
            </label>
          </AuthToast>
          {!!boards.length && <DropDown boards={boards} />}
        </Box>
      </Box>
      <AddTaskModal board={currentColumn} modal="create" />
      <AuthToastCompoent />
    </>
  );
};

export default Todos;
