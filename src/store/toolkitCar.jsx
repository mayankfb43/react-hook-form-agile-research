import { createSlice } from "@reduxjs/toolkit";

let carSlice = createSlice({
  name: "car",
  initialState: [{ id: 1, name: "mcLaren" }],
  reducers: {
    addCar: (state, action) => {
      return [...state, { id: action.payload.id, name: action.payload.name }];
    },
  },
});

export const { addCar } = carSlice.actions;
export default carSlice.reducer;
