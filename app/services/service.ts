import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface AddItem<T> {
  previousItem: T[];
}
export const onSuccess = (queryClient: QueryClient, key: any) => {
  queryClient.invalidateQueries({
    queryKey: [key],
  });
};

export const onError = <T>(
  queryClient: QueryClient,
  error: Error,
  queryKey: string,
  context: AddItem<T> | undefined
) => {
  error.message = "An Unexpected Error Occured";
  if (!context) return;
  queryClient.setQueryData<T[]>([queryKey], context.previousItem);
};

export const onMutate = <T>(
  item: T,
  queryKey: string,
  queryClient: QueryClient
) => {
  const previousItem = queryClient.getQueryData<T[]>([queryKey]) || [];
  queryClient.setQueryData<T[]>([queryKey], (queryKey) => [
    ...(queryKey || []),
    item,
  ]);

  return { previousItem };
};
