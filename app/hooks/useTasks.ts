import { useQuery } from "@tanstack/react-query";
import { APIFunctions } from "../services/useAll";
import { useAdd, useDelete, useUpdate } from "../services/useApiClient";
import { TaskFull } from "../types/board";
import { schemaTask } from "../api/validation";
import { number } from "zod";

export const useGet = <T>(api: string) => {
  const create = new APIFunctions("columns/" + api);
  return useQuery({
    queryKey: [api],
    queryFn: () => create.Get<T>(),
  });
};

export const useGetTasks = (id: number) => {
  return useGet<TaskFull[]>(id.toString());
};

export const useAssignTask = () => {
  return useAdd<{ columnId: number }>({
    api: `columns`,
    mutationKey: "tasks",
    queryKey: "tasks",
  });
};

export const useUpdateTaskLocation = () => {
  return useUpdate<{ taskId: number; columnId: number }>({
    api: "columns/tasks",
    mutationKey: "tasks",
    queryKey: "tasks",
    dontDoAddition: true,
  });
};

export const useDeleteTask = () => {
  return useDelete<{ taskId: number }>({
    api: "columns/tasks",
    mutationKey: "tasks",
    queryKey: "tasks",
  });
};

export const useUpdateTask = () => {
  return useUpdate<TaskFull & { taskId: number }>({
    api: "columns/tasks",
    mutationKey: "tasks",
    queryKey: "tasks",
  });
};

export const useAddNewTask = () => {
  return useAdd<TaskFull & { columnId: number }>({
    api: "columns",
    mutationKey: "tasks",
    queryKey: "tasks",
  });
};

export const useUpdateTest = () => {
  return useUpdate<{ columnId: number; taskOrder: number[] }>({
    api: "columns",
    mutationKey: "tasks",
    queryKey: "tasks",
    dontDoAddition: true,
  });
};
