import { useFormContext, useFormState } from "react-hook-form";
import { TextField } from "../form-control/TextField";
import { useRenderCount } from "../hooks/UseRenderCount";

export const PersonalDetails = () => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name: ["name", "email"] });
  return (
    <>
      {useRenderCount()}
      <tr>
        <td>
          <TextField
            label="Name"
            type="text"
            {...register("name", {
              required: "this is required",
            })}
            error={errors.name}
          />
        </td>
        <td>
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
        </td>
      </tr>
    </>
  );
};
