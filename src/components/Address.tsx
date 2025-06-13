import { useFormContext } from "react-hook-form";
import { TextField } from "../form-control/TextField";

export const Address = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <TextField
        label="Street"
        type="text"
        {...register("street", {
          required: "this is required",
        })}
        error={errors.street}
      />
      <TextField
        label="City"
        type="text"
        {...register("city", {
          required: "this is required",
          validate: {
            checkEmail(value) {
              if (value === "delhi") {
                return "city not allowed";
              } else {
                return true;
              }
            },
          },
        })}
        error={errors.city}
      />
    </>
  );
};
