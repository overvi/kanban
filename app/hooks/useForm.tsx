import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  useFieldArray,
  useForm as useHookForm,
} from "react-hook-form";
import { z } from "zod";

interface Props<
  T extends FieldValues = FieldValues,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  defaultValue: FieldPathValue<TFieldValues, TName>;
  fieldName: string;
  schemaType: z.ZodObject<FieldValues>;
}

function useForm<TFieldValues extends FieldValues>({
  defaultValue,
  fieldName,
  schemaType,
}: Props<TFieldValues>) {
  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
    unregister,
    watch,

    reset,
  } = useHookForm<TFieldValues>({
    resolver: zodResolver(schemaType),
    defaultValues: defaultValue,
    values: defaultValue,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName as any,
  });

  return {
    fields,
    append,
    watch,
    remove,
    reset,
    handleSubmit,
    errors,
    register,
    unregister,
    control,
  };
}

export default useForm;
