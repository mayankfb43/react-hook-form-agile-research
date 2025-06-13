import { FormProvider, useForm } from "react-hook-form";
import { PersonalDetails } from "./components/PersonalDetails";
import { Address } from "./components/Address";
import { FoodItemList } from "./components/FoodList";

export type FoodItemType = {
  name: string;
  quantity: number;
};

type ContactForm = {
  name: string;
  email: string;
  foodItems: FoodItemType[];
};

export default function App() {
  const methods = useForm<ContactForm>({
    defaultValues: {
      foodItems: [
        { name: "Apple Pie", quantity: 5 },
        { name: "Pizza", quantity: 6 },
      ],
    },
  });

  function initiateSubmit(formState: ContactForm) {
    console.log(formState);
  }

  return (
    <>
      <form onSubmit={methods.handleSubmit(initiateSubmit)}>
        <FormProvider {...methods}>
          <PersonalDetails />
          <Address />
          <FoodItemList />
        </FormProvider>
        <input type="submit" value={"submit"} />
      </form>
    </>
  );
}
