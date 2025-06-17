import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("intercepted", response);
    response.x = "10";
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const fetchedTasks = createAsyncThunk(
  "fetchTasks",
  async (action, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      return { tasks: response.data };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const addTask = createAsyncThunk(
  "addTask",
  async (action, { rejectWithValue }) => {
    try {
      let response = await axios.post("http://localhost:5000/api/tasks", {
        task: action.task,
      });
      return { task: response.data };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// export const addTask = createAsyncThunk(
//   "addTask",
//   async (action, { rejectWithValue }) => {
//     try {
//       let response = await axios.post("http://localhost:5000/api/tasks", {
//         task: action.task,
//       });
//       return { task: response.data };
//     } catch (error) {
//       return rejectWithValue({ error: error.message });
//     }
//   }
// );

let employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    error: "",
    employee: [],
  },
  reducers: {
    getTasks: (state, action) => {
      console.log(JSON.stringify(action.payload.data));
      return [...state, ...action.payload.data];
    },
    addEmployee: (state, action) => {
      return [...state, { id: action.payload.id, name: action.payload.name }];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchedTasks.fulfilled, (state, action) => {
      state.employee.push(...action.payload.tasks);
      state.loading = false;
    }),
      builder.addCase(fetchedTasks.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(fetchedTasks.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      }),
      builder.addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.employee.push({ ...action.payload.task });
      }),
      builder.addCase(addTask.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { addEmployee, getTasks } = employeeSlice.actions;
export default employeeSlice.reducer;
