"use client";

import { toggleModal } from "@/app/helpers/ToggleModal";
import useForm from "@/app/hooks/useForm";
import { Box, Button, IconButton, Text } from "@radix-ui/themes";

import { schemaPatch } from "@/app/api/validation";
import { BoardFull } from "@/app/types/board";
import { useEffect } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { returnError } from "../../types/post";
import { Board } from "@prisma/client";

interface Props {
  onSubmit: (data: BoardFull) => void;
  onRemove?: (index: number) => void;
  whichModal: string;
  defaultValue?: BoardFull | Board;
}

const Modal = ({ onSubmit, whichModal, defaultValue, onRemove }: Props) => {
  const { fields, handleSubmit, reset, register, append, remove, errors } =
    useForm<BoardFull>({
      defaultValue: defaultValue,
      fieldName: "columns",
      schemaType: schemaPatch,
    });

  useEffect(() => {
    append({ title: "" });
  }, []);

  return (
    <>
      <div className="modal modal-post !mt-0" role="dialog">
        <div className="modal-box ">
          <h3 className="font-bold text-opposite text-lg">Add new Board</h3>
          <form
            onSubmit={handleSubmit((data) => {
              reset();
              onSubmit(data);
              toggleModal();
            })}
            className=" rounded pt-6 pb-4 mb-4  space-y-5"
          >
            <div className="pb-3">
              <label
                className=" block text-opposite text-sm font-bold pb-3"
                htmlFor="username"
              >
                Name
              </label>
              <input
                {...register("title")}
                className="border-0 ring-0  bg-gray-input outline-none shadow appearance-none rounded w-full py-2 px-3 leading-tight  focus:shadow-outline"
                id="username"
                type="text"
              />

              <Text className="font-semibold text-red-500">
                {returnError(errors.title)}
              </Text>
            </div>
            <label
              className="block text-opposite text-sm font-bold "
              htmlFor="password"
            >
              Columns
            </label>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                className="flex rounded-lg bg-gray-input shadow "
              >
                <input
                  key={field.id}
                  {...register(`columns.${index}.title` as const)}
                  type="text"
                  className="focus:ring-0 bg-gray-input focus:outline-none border-0   text-sm rounded block w-full py-2 px-3 "
                />

                {index !== 0 && (
                  <IconButton
                    className="mr-3 hover:text-red-600 transition-colors delay-75"
                    onClick={() => {
                      remove(index);
                      if (onRemove) {
                        onRemove(index);
                      }
                    }}
                  >
                    <RiDeleteBin4Line size="25" />
                  </IconButton>
                )}
              </Box>
            ))}

            <Button
              type="button"
              onClick={() => (fields.length !== 6 ? append({ title: "" }) : "")}
              className="add-column shadow-md font-semibold text-purple-1 w-full rounded-3xl p-2"
            >
              Add New Column
            </Button>
            <Button
              type="submit"
              className="bg-purple-1 font-semibold text-white w-full rounded-3xl p-2"
            >
              {whichModal == "7" ? "Create Board" : "Edit Board"}
            </Button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor={`my_modal_${whichModal}`}>
          Close
        </label>
      </div>
    </>
  );
};

export default Modal;
