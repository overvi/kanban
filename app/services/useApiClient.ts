import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddItem, onError, onMutate, onSuccess } from "./service";
import { APIFunctions } from "./useAll";
import { useRouter } from "next/navigation";

interface Props {
  queryKey: any;
  mutationKey: any;
  api: any;
  dontDoAddition?: true | false;
}

export const useAdd = <T>(props: Props) => {
  const queryClient = useQueryClient();
  const create = new APIFunctions(props.api);
  const router = useRouter();
  return useMutation<T, Error, T, AddItem<T>>({
    mutationFn: (items: T) => create.AddNew<T>(items),

    onMutate(items: T) {
      router.refresh();
      return onMutate<T>(items, props.queryKey, queryClient);
    },
    onSuccess(newData, savedData) {
      router.refresh();
      onSuccess(queryClient, props.queryKey);
    },
    onError(error, variables, context) {
      onError<T>(queryClient, error, props.queryKey, context);
    },
  });
};

export const useGet = <T>(api: string) => {
  const create = new APIFunctions(api);
  return useQuery({
    queryKey: [api],
    queryFn: () => create.Get<T>(),
  });
};

export const useUpdate = <T>(props: Props) => {
  const create = new APIFunctions(props.api);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<T, Error, T, AddItem<T>>({
    mutationFn: (item: T) => create.Update<T>(item),

    onMutate: (items: T) => {
      if (!props.dontDoAddition) {
        router.refresh();
      }
      return onMutate<T>(items, props.queryKey, queryClient);
    },
    onSuccess(newData, savedData) {
      if (!props.dontDoAddition) {
        router.refresh();
      }
      onSuccess(queryClient, props.queryKey);
    },
    onError(error, variables, context) {
      onError(queryClient, error, props.queryKey, context);
    },
  });
};

export const useDelete = <T>(items: Props) => {
  const queryClient = useQueryClient();
  const create = new APIFunctions(items.api);
  const router = useRouter();
  return useMutation<T, Error, T, AddItem<T>>({
    mutationFn: (item: T) => create.Delete<T>(item),

    onMutate(newItem: T) {
      router.refresh();
      return onMutate<T>(newItem, items.queryKey, queryClient);
    },

    onSuccess(newData, savedData) {
      router.refresh();
      onSuccess(queryClient, items.mutationKey);
    },
    onError(error, variables, context) {
      onError(queryClient, error, items.queryKey, context);
    },
  });
};
