import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};
export const toDoListSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const item = { text: action.payload, isDone: false };
      state.tasks.push(item);
    },
    removeTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    changeCheckedStatus: (state, action) => {
      state.tasks[action.payload].isDone === false
        ? (state.tasks[action.payload].isDone = true)
        : (state.tasks[action.payload].isDone = false);
    },
  },
});

export const { addTask, removeTask, changeCheckedStatus } =
  toDoListSlice.actions;

export const selectToDOList = (state) => state.toDOList.tasks;

export default toDoListSlice.reducer;
