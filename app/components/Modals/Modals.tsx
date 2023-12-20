"use client";

import { schemaPatch } from "@/app/api/validation";
import { useAddBoard } from "@/app/hooks/useBoards";
import {
  useAddNewColumn,
  useDeleteColumn,
  useGetColumns,
  useUpdateColumn,
} from "@/app/hooks/useColumns";
import { BoardFull } from "@/app/types/board";
import { useBearStore } from "@/app/zustand/useCurrentBoard";
import { Board } from "@prisma/client";
import { ReactNode } from "react";
import Nav from "../Nav/Nav";
import MobileDropDown from "./MobileDropDown";
import Modal from "./ModalBase";

export const CreateBoard = () => {
  const requests = useAddBoard();

  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <Modal
        whichModal="7"
        onSubmit={(data) => {
          requests.mutate(data);
        }}
      />
    </>
  );
};

export const EditBoard = ({ defaultValue }: { defaultValue: BoardFull }) => {
  const { data: columns } = useGetColumns();
  const AddNew = useAddNewColumn();
  const Update = useUpdateColumn();

  const { currentBoard } = useBearStore();
  const mutateDelete = useDeleteColumn();

  const toggleEdit = (data: schemaPatch) => {
    const stale = columns?.columns.map((column) => column.id);

    const freshData = data.columns.filter(
      (column) => !stale?.includes(column.id!)
    );

    AddNew.mutate({
      columns: freshData,
    });

    Update.mutate({
      title: data.title,
      columns: data.columns.map((column) => ({
        title: column.title,
        id: column.id,
      })),
    });
  };

  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <Modal
        onRemove={(index) => {
          if (columns?.columns[index])
            mutateDelete.mutate({
              boardId: currentBoard!,
              columnId: defaultValue?.columns[index].id || 1,
            });
        }}
        defaultValue={defaultValue}
        whichModal="6"
        onSubmit={(data: BoardFull) => {
          if (columns) toggleEdit(data);
        }}
      />
    </>
  );
};

interface Props {
  onClick: () => void;
  modal: string;
  children: ReactNode;
}

export const DeleteModal = ({ onClick, modal, children }: Props) => {
  return (
    <>
      <input type="checkbox" id={modal} className="modal-toggle" />
      <div className="modal !mt-0 " role="dialog">
        <div className="modal-box flex flex-col">
          <h3 className="font-bold text-lg pb-5">Delete Confirm</h3>
          <p className="font-semibold">{children}</p>
          <label
            onClick={() => {
              onClick();
              (document.getElementById(modal) as HTMLInputElement).checked =
                false;
            }}
            className="btn mt-7 text-white font-semibold bg-red-600 "
          >
            Delete
          </label>
        </div>
        <label className="modal-backdrop" htmlFor={modal}>
          Close
        </label>
      </div>
    </>
  );
};

export const NavBarModal = ({ boards }: { boards: Board[] }) => {
  return (
    <>
      <label htmlFor="my_modal_nav">
        <MobileDropDown />
      </label>

      <input type="checkbox" id="my_modal_nav" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-gray-2">
          <Nav boards={boards} />
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_nav">
          Close
        </label>
      </div>
    </>
  );
};
