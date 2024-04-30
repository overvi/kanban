"use client";

import { Box } from "@radix-ui/themes";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import FetchBoards from "../components/Board/FetchBoards";
import { ToggleShowSide } from "../helpers/ToggleSideBar";
import { BoardFull } from "../types/board";
import { useBearStore } from "../zustand/useCurrentBoard";
import { useUpdateTaskLocation, useUpdateTest } from "../hooks/useTasks";

const Board = ({ boards }: { boards: BoardFull[] }) => {
  const { currentBoard } = useBearStore();
  const updateLocation = useUpdateTest();
  const updateTaskColumn = useUpdateTaskLocation();

  const onDragEnd = (data: DropResult) => {
    const { destination, source, draggableId } = data;
    const board = boards.find((board) => board.id == currentBoard);
    const task = board?.columns.map((column) =>
      column.tasks.map((task) => task.id)
    );

    const currentColumnId = task?.find((task) => task.includes(draggableId));
    const currentColumn = board?.columns.find((column) =>
      column.tasks.find((task) => currentColumnId?.includes(task.id))
    );

    if (!destination) return;

    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    const start = board?.columns.find(
      (column) => column.id == source.droppableId
    );
    const finish = board?.columns.find(
      (column) => column.id == destination.droppableId
    );

    if (start?.id === finish?.id) {
      const taskIds = currentColumn?.tasks.map((task) => task.id);
      taskIds?.splice(source.index, 1);
      taskIds?.splice(destination.index, 0, draggableId);

      const taskItem = currentColumn?.tasks.splice(source.index, 1)[0];
      currentColumn?.tasks.splice(destination.index, 0, taskItem!);

      updateLocation.mutate({
        taskOrder: taskIds!,
        columnId: currentColumn?.id!,
      });
    } else {
      const item = start?.tasks.splice(source.index, 1)[0];
      finish?.tasks.splice(destination.index, 0, item!);
      updateTaskColumn.mutate({
        taskId: draggableId,
        columnId: finish?.id!,
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={(data) => onDragEnd(data)}>
        <Box className=" absolute left-transition cursor-move board-container  p-6 flex gap-5">
          <FetchBoards boards={boards} />
        </Box>
      </DragDropContext>
      <ToggleShowSide />
    </>
  );
};

export default Board;
