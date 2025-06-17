//action types
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

//action creator
export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: {
      task: task,
    },
  };
};

export const removeTask = (id) => {
  return {
    type: REMOVE_TASK,
    payload: { id },
  };
};

//thunk
export function fetchTodo(id) {
  return async function (dispatch, getState) {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    let todo = await response.json();
    dispatch(addTask(todo.title));
  };
}

//reducer
let id = 0;
export const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: ++id,
          task: action.payload.task,
        },
      ];
      braak;
    case "REMOVE_TASK":
      return state.filter((t) => {
        return t.id != action.payload.id;
      });
      break;
  }
};
