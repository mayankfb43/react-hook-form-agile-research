import { forwardRef, type ForwardedRef } from "react";
import { useForm, type FieldError } from "react-hook-form";
import React from "react";

type ContactForm = {
  name: string;
  email: string;
};

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error: FieldError | undefined;
};

const TextField = forwardRef(
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

export default function App() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();

  function initiateSubmit(formState: ContactForm) {
    console.log(formState);
  }

  return (
    <>
      <form onSubmit={handleSubmit(initiateSubmit)}>
        <TextField
          label="Name"
          type="text"
          {...register("name", {
            required: "this is required",
          })}
          error={errors.name}
        />
        <input type="text" {...register("email")} />
        <input type="submit" value={"submit"} />
      </form>
    </>
  );
}
