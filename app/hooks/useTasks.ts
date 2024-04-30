import { useQuery } from "@tanstack/react-query";
import { APIFunctions } from "../services/useAll";
import { useAdd, useDelete, useUpdate } from "../services/useApiClient";
import { TaskFull } from "../types/board";

export const useGet = <T>(api: string) => {
  const create = new APIFunctions("columns/" + api);
  return useQuery({
    queryKey: [api],
    queryFn: () => create.Get<T>(),
  });
};

export const useGetTasks = (id: string) => {
  return useGet<TaskFull[]>(id.toString());
};

export const useAssignTask = () => {
  return useAdd<{ columnId: string }>({
    api: `columns`,
    mutationKey: "tasks",
    queryKey: "tasks",
  });
};

export const useUpdateTaskLocation = () => {
  return useUpdate<{ taskId: string; columnId: string }>({
    api: "columns/tasks",
    mutationKey: "tasks",
    queryKey: "tasks",
    dontDoAddition: true,
  });
};

export const useDeleteTask = () => {
  return useDelete<{ taskId: string }>({
    api: "columns/tasks",
    mutationKey: "tasks",
    queryKey: "tasks",
  });
};

export const useUpdateTask = () => {
  return useUpdate<TaskFull & { taskId: string }>({
    api: "columns/tasks",
    mutationKey: "tasks",
    queryKey: "tasks",
  });
};

export const useAddNewTask = () => {
  return useAdd<TaskFull & { columnId: string }>({
    api: "columns",
    mutationKey: "tasks",
    queryKey: "tasks",
  });
};

export const useUpdateTest = () => {
  return useUpdate<{ columnId: string; taskOrder: string[] }>({
    api: "columns",
    mutationKey: "tasks",
    queryKey: "tasks",
    dontDoAddition: true,
  });
};
