import { useQuery } from "@tanstack/react-query";

import { schemaPatch } from "../api/validation";
import { APIFunctions, DeleteProps } from "../services/useAll";
import { useAdd, useDelete, useUpdate } from "../services/useApiClient";
import { BoardFull } from "../types/board";
import { useBearStore } from "../zustand/useCurrentBoard";

export const useGetColumns = () => {
  const { currentBoard } = useBearStore();
  return useGet<BoardFull>(currentBoard?.toString()!);
};

export const useGet = <T>(api: string) => {
  const create = new APIFunctions(api);
  return useQuery({
    queryKey: [api],
    queryFn: () => create.Get<T>(),
  });
};

export const useDeleteColumn = () => {
  const { currentBoard } = useBearStore();
  return useDelete<DeleteProps>({
    api: currentBoard,
    mutationKey: currentBoard,
    queryKey: "columns",
  });
};

export const useUpdateColumn = () => {
  const { currentBoard } = useBearStore();
  return useUpdate<schemaPatch>({
    api: currentBoard,
    mutationKey: currentBoard,
    queryKey: "columns",
  });
};

export const useAddNewColumn = () => {
  const { currentBoard } = useBearStore();
  return useAdd<schemaPatch>({
    api: currentBoard,
    mutationKey: "columns",
    queryKey: "columns",
  });
};
