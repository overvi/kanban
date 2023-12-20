"use client";

import { schemaTask } from "@/app/api/validation";
import { useGetColumns } from "@/app/hooks/useColumns";
import { useAddNewTask } from "@/app/hooks/useTasks";
import { BoardFull, TaskFull } from "@/app/types/board";
import { Box, Button, Container, IconButton, Text } from "@radix-ui/themes";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useForm from "../../hooks/useForm";
import { toggleModal } from "@/app/helpers/ToggleModal";
import { returnError } from "@/app/types/post";
import { useDeleteSubTask } from "@/app/hooks/useSubTask";
import { Board } from "@prisma/client";

interface Props {
  defaultValue?: schemaTask;
  onSubmit?: (data: TaskFull & { columnId: number }) => void;
  modal: string;
  board?: BoardFull;
}

export const AddTaskModal = ({
  defaultValue,
  onSubmit,
  modal,
  board,
}: Props) => {
  const { fields, handleSubmit, register, append, remove, reset, errors } =
    useForm<TaskFull>({
      defaultValue: defaultValue,
      fieldName: "subTasks",
      schemaType: schemaTask,
    });

  const { data: columns } = useGetColumns();
  const [columnId, setColumnId] = useState<string>("0");
  const addNewTask = useAddNewTask();
  const deleteSubTask = useDeleteSubTask();

  return (
    <>
      <input type="checkbox" id={modal} className="modal-toggle" />
      <form
        onSubmit={handleSubmit((data) => {
          toggleModal();
          reset();
          if (!onSubmit) {
            return addNewTask.mutate({
              ...data,
              columnId: parseInt(columnId),
            });
          }
          onSubmit(data);
        })}
        className="modal !mt-0"
        role="dialog"
      >
        <div className="modal-box space-y-4 ">
          <h3 className="text-lg font-bold">Add New Task</h3>
          <div className="space-y-2">
            <span className="label-text font-bold ">Title</span>
            <input
              {...register("title")}
              type="text"
              className="shadow  border-0 ring-0 bg-gray-input  outline-none   text-sm rounded-lg  block w-full p-2.5 "
            />
            <Text className="font-semibold text-red-500">
              {returnError(errors.title)}
            </Text>
          </div>
          <div className="space-y-2">
            <span className="label-text font-bold ">Description</span>
            <input
              {...register("description")}
              type="text"
              className="border-0 shadow bg-gray-input outline-none block w-full p-4   rounded-lg  sm:text-md ring-0 "
            />
            <Text className="font-semibold text-red-500">
              {returnError(errors.description)}
            </Text>
          </div>
          <Container>
            <span className="label-text mb-5 font-bold ">SubTasks</span>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                className="flex mt-5 shadow bg-gray-input gap-11 rounded-lg "
              >
                <input
                  key={field.id}
                  {...register(`subTasks.${index}.title`)}
                  type="text"
                  className="shadow-none focus:ring-0 focus:outline-none bg-gray-input border-0   text-sm rounded-lg block w-full p-2.5 "
                />
                <IconButton
                  onClick={() => {
                    remove(index);
                    if (defaultValue && defaultValue?.subTasks![index])
                      deleteSubTask.mutate({
                        subTaskId: defaultValue?.subTasks![index].id!,
                      });
                  }}
                >
                  <MdOutlineDeleteOutline size="33" />
                </IconButton>
              </Box>
            ))}
          </Container>
          <Button
            type="button"
            onClick={() => (fields.length !== 6 ? append({ title: "" }) : "")}
            className="add-column  shadow-md font-semibold text-purple-1 w-full rounded-3xl p-2"
          >
            Add New SubTask
          </Button>
          {modal == "create" && (
            <div className="space-y-2">
              <span className="label-text font-semibold ">Status</span>
              <select
                onChange={(data) => setColumnId(data.target.value)}
                className="select border-status-100 focus:outline-none block  border  w-full max-w-xs"
              >
                <option value="">Set Column</option>
                {board?.columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            type="submit"
            className="bg-purple-1 font-semibold text-white w-full rounded-3xl p-2"
          >
            {modal == "create" ? "Create Task" : "Edit Task"}
          </Button>
        </div>
        <label className="modal-backdrop " htmlFor={modal}>
          Close
        </label>
      </form>
    </>
  );
};
