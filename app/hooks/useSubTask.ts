import { useAdd, useDelete, useUpdate } from "../services/useApiClient";

export const useCompleteSubTask = () => {
  return useUpdate<{ completed: boolean; subTaskId: number }>({
    api: `columns/subtasks`,
    mutationKey: "subtasks",
    queryKey: "subtasks",
  });
};

export const useDeleteSubTask = () => {
  return useDelete<{ subTaskId: number }>({
    api: "columns/tasks/subtasks",
    mutationKey: "subTasks",
    queryKey: "subTasks",
  });
};

export const useAddNewSubTask = () => {
  return useAdd<{ taskId: number; subTasks: { title: string }[] }>({
    api: "columns/tasks/subtasks",
    mutationKey: "subTasks",
    queryKey: "subTasks",
  });
};

export const useUpdateSubTask = () => {
  return useUpdate({
    api: "columns/tasks/subtasks",
    mutationKey: "subTasks",
    queryKey: "subTask",
  });
};
