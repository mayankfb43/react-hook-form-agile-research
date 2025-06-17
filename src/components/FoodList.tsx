import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import type { FoodItemType } from "../App";
import { TextField } from "../form-control/TextField";
import { useEffect } from "react";
import { useRenderCount } from "../hooks/UseRenderCount";

export function FoodItemList() {
  const { register, control, getValues, trigger, clearErrors } =
    useFormContext<{
      foodItems: FoodItemType[];
      city: string;
    }>();
  const { errors } = useFormState({ name: ["foodItems"] });
  const { fields, append, remove, swap } = useFieldArray({
    name: "foodItems",
    control,
  });

  // 👇 Watch city value so that dependent validations get triggered on change
  const city = useWatch({ name: "city", control });
  const foodItems = useWatch({ name: "foodItems", control });

  useEffect(() => {
    trigger("foodItems.0.quantity");
  }, [city, trigger]);

  function onRowAdd() {
    append({ name: "Food", quantity: 1 });
    clearErrors("foodItems");
  }
  let formValues = getValues();
  return (
    <>
      {useRenderCount()}
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
                  setTimeout(() => {
                    for (let i = 0; i < foodItems.length; i++) {
                      trigger(`foodItems.${i}.quantity`);
                    }
                  }, 0);
                }}
              >
                Remove
              </button>
              {index != foodItems.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    swap(index, index + 1);
                  }}
                >
                  move down
                </button>
              )}
              {index != 0 && (
                <button
                  type="button"
                  onClick={() => {
                    swap(index, index - 1);
                  }}
                >
                  move up
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}
