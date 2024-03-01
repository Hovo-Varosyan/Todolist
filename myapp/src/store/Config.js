import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./Todostore";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default store;
