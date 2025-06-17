import { configureStore } from "@reduxjs/toolkit";
import employee from "./toolkitEmployee";
import car from "./toolkitCar";
import { log } from "../middleware/log";

let store = configureStore({
  reducer: { employeeData: employee, car: car },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(log),
});

export default store;
