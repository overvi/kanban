import { User } from "@clerk/nextjs/dist/types/server";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserList = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
  });
};
