"use client";

import { useDeleteBoard } from "@/app/hooks/useBoards";
import { useBearStore } from "@/app/zustand/useCurrentBoard";
import { Board } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import { DeleteModal, EditBoard } from "../Modals/Modals";

const DropDown = ({ boards }: { boards: Board[] }) => {
  const deleteAll = useDeleteBoard();
  const { currentBoard, setCurrentBoard } = useBearStore();
  const newCurrentBoard = boards.find((board) => board.id == currentBoard);
  const currentIndex = boards.indexOf(newCurrentBoard!);
  const setColumnLogic =
    currentIndex - 1 !== -1 ? currentIndex - 1 : currentIndex + 1;

  if (newCurrentBoard)
    return (
      <>
        <DeleteModal
          modal="deleteAll"
          onClick={() => {
            deleteAll.mutate({
              deleteAll: true,
            });

            if (boards.length !== 1) setCurrentBoard(boards[setColumnLogic].id);
          }}
        >
          Are you sure you want to delete this Board?
        </DeleteModal>

        <div className="dropdown  dropdown-left dropdown-bottom">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1  bg-transparent border-0 shadow-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="26"
              height="26"
              viewBox="0 0 50 50"
              className="fill-opposite"
            >
              <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <label htmlFor="my_modal_6">
                <Text>Edit</Text>
              </label>
            </li>
            <li>
              <label htmlFor="deleteAll">
                <Text>Delete</Text>
              </label>
            </li>
          </ul>
        </div>
        <EditBoard defaultValue={newCurrentBoard} />
      </>
    );
};

export default DropDown;
