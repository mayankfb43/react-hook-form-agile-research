import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import type { FoodItemType } from "../App";
import { TextField } from "../form-control/TextField";

export function FoodItemList() {
  const { register } = useFormContext<{ foodItems: FoodItemType[] }>();
  const { errors } = useFormState({ name: ["foodItems"] });
  const { fields } = useFieldArray({ name: "foodItems" });
  return (
    <>
      {fields.map((field, index) => {
        return (
          <>
            <TextField
              error={errors.foodItems?.[index]?.name}
              label="food1 name"
              {...register(`foodItems.${index}.name`, {
                required: "this is required",
              })}
            />
            <TextField
              error={errors.foodItems?.[index]?.quantity}
              label="food1 quantity"
              {...register(`foodItems.${index}.quantity`, {
                required: "this is required",
                max: {
                  value: 10,
                  message: "Maximum 10 allowed",
                },
              })}
            />
          </>
        );
      })}
    </>
  );
}
