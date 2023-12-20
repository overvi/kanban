import { FieldError } from "react-hook-form";

export type submitForm = {
  title?: string;
  column?: string;
};

export const returnError = (error: FieldError | undefined) => {
  if (error) return error.message;
};
