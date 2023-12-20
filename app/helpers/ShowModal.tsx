"use client";

import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { Draggable } from "react-beautiful-dnd";
import { AddTaskModal } from "../components/Modals/AddTaskModal";
import { DeleteModal } from "../components/Modals/Modals";
import { useGetColumns } from "../hooks/useColumns";
import {
  useAddNewSubTask,
  useCompleteSubTask,
  useUpdateSubTask,
} from "../hooks/useSubTask";
import {
  useDeleteTask,
  useUpdateTask,
  useUpdateTaskLocation,
} from "../hooks/useTasks";
import { TaskFull } from "../types/board";
import { toggleModal } from "./ToggleModal";

interface Props {
  task: TaskFull;
  modalId: number;
  index: number;
}

const ShowModal = ({ task, modalId, index }: Props) => {
  const assignSubTask = useCompleteSubTask();
  const { data: columns } = useGetColumns();
  const updateLocation = useUpdateTaskLocation();
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateSubTask();
  const addNewSubTask = useAddNewSubTask();
  return (
    <>
      <DeleteModal
        modal={`delete_${task.id}`}
        onClick={() =>
          deleteTask.mutate({
            taskId: task.id,
          })
        }
      >
        Are you sure you want to delete this Task?
      </DeleteModal>
      <AddTaskModal
        onSubmit={(data) => {
          const stale = task.subTasks.map((subTask) => subTask.id);
          const freshData = data.subTasks.filter(
            (subTask) => !stale.includes(subTask.id)
          );

          addNewSubTask.mutate({
            subTasks: freshData.map((a) => ({
              title: a.title,
            })),
            taskId: task.id,
          });

          updateTask.mutate({
            ...data,
            taskId: task.id,
          });
        }}
        modal={`edit_${task.id}`}
        defaultValue={task}
      />

      <Draggable
        key={task.id.toString()}
        draggableId={task.id.toString()}
        index={index}
      >
        {(provided) => (
          <label
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            htmlFor={`my_modal_task_${task.id}`}
            className="cursor-grab drag shadow-task block !mt-0 !mb-5  bg-gray-2 shadow-md rounded-md p-5"
          >
            <Heading className="font-semibold text-opposite">
              {task.title}
            </Heading>
            <Text className="text-gray-1 text-sm tracking-[.3px] font-bold">
              {task.description}
            </Text>
          </label>
        )}
      </Draggable>

      <input
        type="checkbox"
        id={`my_modal_task_${modalId}`}
        className="modal-toggle task_modal"
      />
      <div className="modal" style={{ marginTop: 0 }} role="dialog">
        <div className="modal-box cursor-default">
          <Flex className="space-y-3">
            <Box className="flex justify-between">
              <Heading className="text-opposite text-xl font-semibold">
                {task.title}
              </Heading>
              <div className="dropdown  dropdown-left dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className=" m-1 border-0 shadow-none"
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
                  className="bg-gray-input dropdown-content z-[1] menu p-2 shadow rounded-box w-52"
                >
                  <li>
                    <label
                      onClick={() => toggleModal()}
                      htmlFor={`edit_${task.id}`}
                    >
                      <Text>Edit</Text>
                    </label>
                  </li>
                  <li>
                    <label
                      onClick={() => toggleModal()}
                      htmlFor={`delete_${task.id}`}
                    >
                      <Text>Delete</Text>
                    </label>
                  </li>
                </ul>
              </div>
            </Box>
            <Heading className="font-semibold pb-5 text-gray-1 text-sm">
              {task.description}
            </Heading>
            <Box className="space-y-2 ">
              <label
                htmlFor="first_name"
                className="block mb-2  font-bold text-sm  text-opposite"
              >
                Subtasks (0 of {task.subTasks?.length})
              </label>

              {task.subTasks?.map((subTask) => (
                <form
                  key={subTask.id}
                  className="shadow rounded-md cursor-pointer bg-gray-input w-full h-10"
                >
                  <div className="form-control px-3">
                    <label className="cursor-pointer label">
                      <span
                        className={`label-text , ${
                          subTask.completed && "line-through"
                        }`}
                      >
                        {subTask.title}
                      </span>
                      <input
                        onChange={(data) =>
                          assignSubTask.mutate({
                            completed: data.target.checked,
                            subTaskId: subTask.id!,
                          })
                        }
                        type="checkbox"
                        className="bg-gray-100 checkbox border-0 outline-0 ring-0 text-3xl checkbox-success"
                        id="myCheckbox"
                        checked={subTask.completed}
                      />
                    </label>
                  </div>
                </form>
              ))}
            </Box>
          </Flex>
        </div>

        <label className="modal-backdrop" htmlFor={`my_modal_task_${modalId}`}>
          Close
        </label>
      </div>
    </>
  );
};

export default ShowModal;
