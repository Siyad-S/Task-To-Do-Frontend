import { configureStore } from "@reduxjs/toolkit";
import ToDoSlice from "./slices/toDoHomeSlice";
export const store = configureStore({
  reducer: {
    toDo: ToDoSlice,
  },
});
