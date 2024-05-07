"use client";

import { useDeleteBoard } from "@/app/hooks/useBoards";
import { BoardFull } from "@/app/types/board";
import { useBearStore } from "@/app/zustand/useCurrentBoard";
import { IconButton, Text } from "@radix-ui/themes";
import { DeleteModal, EditBoard } from "../Modals/Modals";
import { IoMdMore } from "react-icons/io";
import AuthToast, { AuthToastCompoent } from "@/app/helpers/AuthToast";
import { useUser } from "@clerk/nextjs";

const DropDown = ({ boards }: { boards: BoardFull[] }) => {
  const { isSignedIn } = useUser();
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

        <div className="dropdown flex items-center  dropdown-left dropdown-bottom">
          <IconButton>
            <IoMdMore size="30" />
          </IconButton>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <AuthToast>
              <li>
                <label htmlFor={isSignedIn ? "my_modal_6" : ""}>
                  <Text>Edit</Text>
                </label>
              </li>
            </AuthToast>
            <AuthToast>
              <li>
                <label htmlFor={isSignedIn ? "deleteAll" : ""}>
                  <Text>Delete</Text>
                </label>
              </li>
            </AuthToast>
          </ul>
        </div>
        <EditBoard defaultValue={newCurrentBoard} />
        <AuthToastCompoent />
      </>
    );
};

export default DropDown;
