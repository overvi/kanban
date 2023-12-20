import { DeleteProps } from "../services/useAll";
import { useAdd, useDelete } from "../services/useApiClient";
import { BoardFull } from "../types/board";
import { useBearStore } from "../zustand/useCurrentBoard";

export const useDeleteBoard = () => {
  const { currentBoard } = useBearStore();

  return useDelete<DeleteProps>({
    api: currentBoard,
    mutationKey: "boards",
    queryKey: "boards",
  });
};

export const useAddBoard = () => {
  return useAdd<BoardFull>({
    api: "",
    mutationKey: "boards",
    queryKey: "boards",
  });
};
