import { FormProvider, useForm } from "react-hook-form";
import { PersonalDetails } from "./components/PersonalDetails";
import { Address } from "./components/Address";
import { FoodItemList } from "./components/FoodList";
import store from "./store/store";
import { addTask, removeTask, fetchTodo } from "./store/todos";
import { Provider } from "react-redux";
import toolkitStore from "./store/toolkitStore";

export type FoodItemType = {
  name: string;
  quantity: number;
};

type ContactForm = {
  x;
  name: string;
  email: string;
  foodItems: FoodItemType[];
};

export default function App() {
  const methods = useForm<ContactForm>({
    mode: "onChange",
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

  store.subscribe(() => {
    console.log(store.getState());
  });

  function handleAddTask() {
    store.dispatch(addTask("new todo"));
    store.dispatch(fetchTodo(4));
  }

  function handleRemoveTask() {
    store.dispatch(removeTask(2));
  }

  return (
    <>
      <Provider store={toolkitStore}>
        <form onSubmit={methods.handleSubmit(initiateSubmit)}>
          <button onClick={handleAddTask}>add task</button>
          <button onClick={handleRemoveTask}>remove task</button>
          <FormProvider {...methods}>
            <table border={1}>
              <PersonalDetails />

              <Address />
              <FoodItemList />
            </table>
          </FormProvider>

          <input type="submit" value={"submit"} />
        </form>
      </Provider>
    </>
  );
}
