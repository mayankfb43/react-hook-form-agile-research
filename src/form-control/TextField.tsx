import { forwardRef, type ForwardedRef } from "react";
import { type FieldError } from "react-hook-form";
import React from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error: FieldError | undefined;
};

export const TextField = forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { type = "text", label, error, ...other } = props;
    return (
      <>
        <input type={type} {...other} ref={ref} />
        <label>{label}</label>
        {error?.message}
      </>
    );
  }
);
