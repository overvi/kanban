import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Board } from "@prisma/client";
import { axiosC } from "../services/useAll";

type State = {
  currentBoard: string | undefined;
};

type Action = {
  setCurrentBoard: (state?: string) => void;
};

export const useBearStore = create<State & Action>()(
  persist(
    (set, get) => ({
      currentBoard: "",
      setCurrentBoard: async (state?: string) => {
        const result = await axiosC
          .get<Board[]>("/boards")
          .then((res) => res.data);

        if (result[0]) await set({ currentBoard: state || result[0].id });
      },
    }),

    {
      name: "current", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      skipHydration: true,
    }
  )
);
