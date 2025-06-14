import { useFormContext, useFormState } from "react-hook-form";
import { TextField } from "../form-control/TextField";
import { useRenderCount } from "../hooks/UseRenderCount";
export const Address = () => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name: ["street", "city"] });
  return (
    <>
      {useRenderCount()}
      <tr>
        <td>
          <TextField
            label="Street"
            type="text"
            {...register("street", {
              required: "this is required",
            })}
            error={errors.street}
          />
        </td>
        <td>
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
        </td>
      </tr>
    </>
  );
};
