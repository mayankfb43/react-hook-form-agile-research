import { useFormContext, useFormState } from "react-hook-form";
import { TextField } from "../form-control/TextField";
import { useRenderCount } from "../hooks/UseRenderCount";
import { useSelector, useDispatch } from "react-redux";
import {
  addEmployee,
  getTasks,
  fetchedTasks,
  addTask,
} from "../store/toolkitEmployee";
import { useEffect } from "react";

export const Address = () => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name: ["street", "city"] });
  useEffect(() => {
    /*const getResponse = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/taskss");
        console.log(response);
        dispatch(getTasks({ data: response.data }));
      } catch (error: any) {
        console.log(error?.message);
        console.log(error?.message);
      }
    };

    getResponse();*/
    (async () => {
      let response = await dispatch(fetchedTasks());
      console.log(JSON.stringify(response));
      console.log(response.payload, "$$$");
    })();
  }, []);
  const employees = useSelector((state) => state.employeeData.employee);
  const dispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => {
          dispatch(addTask({ task: "new task" }));
          dispatch(
            addEmployee({
              name: "kia",
              id: 1000,
            })
          );
        }}
      >
        add employee
      </button>
      {useRenderCount()}
      {employees &&
        employees.map((emp) => {
          return <h1>{emp.task}</h1>;
        })}

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
