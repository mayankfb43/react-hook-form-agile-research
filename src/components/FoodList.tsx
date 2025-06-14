import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import type { FoodItemType } from "../App";
import { TextField } from "../form-control/TextField";
import { useEffect } from "react";

export function FoodItemList() {
  const { register, control, getValues, trigger, clearErrors } =
    useFormContext<{
      foodItems: FoodItemType[];
      city: string;
    }>();
  const { errors } = useFormState({ name: ["foodItems"] });
  const { fields, append, remove } = useFieldArray({
    name: "foodItems",
    control,
  });

  // 👇 Watch city value so that dependent validations get triggered on change
  const city = useWatch({ name: "city", control });

  useEffect(() => {
    trigger("foodItems.0.quantity");
  }, [city, trigger]);

  function onRowAdd() {
    append({ name: "Food", quantity: 1 });
    clearErrors("foodItems");
  }

  return (
    <>
      <button onClick={onRowAdd}>Add</button>
      {fields.map((field, index) => {
        return (
          <tr key={field.id}>
            <td>
              <TextField
                error={errors.foodItems?.[index]?.name}
                label="food1 name"
                {...register(`foodItems.${index}.name`, {
                  required: "this is required",
                })}
              />
            </td>
            <td>
              <TextField
                error={errors.foodItems?.[index]?.quantity}
                label="food1 quantity"
                {...register(`foodItems.${index}.quantity`, {
                  required: "this is required",
                  max: {
                    value: 10,
                    message: "Maximum 10 allowed",
                  },
                  validate: (value) => {
                    const formValues = getValues();
                    const prevQuantity =
                      formValues.foodItems?.[index - 1]?.quantity;

                    if (index > 0 && prevQuantity > 100) {
                      return "previous quantity should be less than 100";
                    }

                    if (city?.length > 10 && index === 0) {
                      return "city length must be less than 10";
                    }

                    return true;
                  },
                })}
              />
              <button
                onClick={() => {
                  remove(index);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
