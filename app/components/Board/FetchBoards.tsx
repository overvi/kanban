"use client";

import { StrictModeDroppable } from "@/app/Stricts";
import ShowModal from "@/app/helpers/ShowModal";
import colors from "@/app/helpers/randomColor";
import { BoardFull } from "@/app/types/board";
import { useBearStore } from "@/app/zustand/useCurrentBoard";
import LoadingBase from "@/loading";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import Empty from "./Empty";
import AuthToast, { AuthToastCompoent } from "@/app/helpers/AuthToast";
import { useUser } from "@clerk/nextjs";

export default function FetchBoards({ boards }: { boards: BoardFull[] }) {
  const { currentBoard } = useBearStore();
  const { isSignedIn } = useUser();
  const currentColumn = boards.find((column) => column.id === currentBoard);

  if (!boards.length) return <Empty />;
  if (!currentColumn?.columns) return <LoadingBase />;
  return (
    <>
      {currentColumn?.columns.map((column, index) => (
        <Container
          key={column.id}
          id={column.id.toString()}
          className=" w-[18rem] px-3 column"
        >
          <Flex className="items-center pb-5 gap-3 text-gray-1 font-semibold flex">
            <span
              className={`inline-block ${colors[index]}  w-4 h-4 rounded-full`}
            />
            <Text>
              {column.title} ( {column.tasks?.length} )
            </Text>
          </Flex>
          {column?.tasks?.length == 0 && <Box className=""></Box>}
          <StrictModeDroppable droppableId={column.id.toString()}>
            {(provided) => (
              <Box
                ref={provided.innerRef}
                className={`${
                  !column.tasks.length &&
                  " h-[70vh] outline-dashed outline-[2px] rounded-md  outline-[rgba(130,143,163,.4)]"
                } space-y-5 min-h-[70vh] `}
                {...provided.droppableProps}
              >
                <span style={{ display: "none" }}>{provided.placeholder}</span>
                {column.tasks.map((task, index) => (
                  <ShowModal
                    key={task.id}
                    index={index}
                    modalId={task.id}
                    task={task}
                  />
                ))}
              </Box>
            )}
          </StrictModeDroppable>
        </Container>
      ))}

      {currentColumn.columns.length !== 6 && (
        <AuthToast>
          <label
            htmlFor={isSignedIn ? "my_modal_6" : ""}
            className="group mt-[2.6rem] cursor-pointer self-start items-center justify-center flex add-column-bg rounded-md w-[18rem] h-[70vh]"
          >
            <Text className="group-hover:text-purple-1 text-gray-1 text-2xl font-semibold">
              +New Column
            </Text>
          </label>
        </AuthToast>
      )}
      <AuthToastCompoent />
    </>
  );
}
