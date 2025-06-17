export const log = (store) => (next) => (action) => {
  console.log(action);
  if (action.type === "employee/addEmployee") {
    console.log(action.payload.name);
  } else {
    next(action);
  }
};
