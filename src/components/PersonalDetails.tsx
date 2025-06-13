import { useFormContext } from "react-hook-form";
import { TextField } from "../form-control/TextField";

export const PersonalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <TextField
        label="Name"
        type="text"
        {...register("name", {
          required: "this is required",
        })}
        error={errors.name}
      />
      <TextField
        label="Email"
        type="text"
        {...register("email", {
          required: "this is required",
          validate: {
            checkEmail(value) {
              if (value === "dummy@email.com") {
                return "email not allowed";
              } else {
                return true;
              }
            },
          },
        })}
        error={errors.email}
      />
    </>
  );
};
