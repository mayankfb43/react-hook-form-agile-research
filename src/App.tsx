import { FormProvider, useForm } from "react-hook-form";
import { PersonalDetails } from "./components/PersonalDetails";
import { Address } from "./components/Address";

type ContactForm = {
  name: string;
  email: string;
};

export default function App() {
  const methods = useForm<ContactForm>();

  function initiateSubmit(formState: ContactForm) {
    console.log(formState);
  }

  return (
    <>
      <form onSubmit={methods.handleSubmit(initiateSubmit)}>
        <FormProvider {...methods}>
          <PersonalDetails />
          <Address />
        </FormProvider>
        <input type="submit" value={"submit"} />
      </form>
    </>
  );
}
