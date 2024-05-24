import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: { list: [], length: 0 },
  reducers: {
    getState(state, action) {
      return { ...action.payload };
    },
    done(state, action) {
      try {
        const newList = state.list.map((todo) => {
          if (todo._id === action.payload) {
            return { ...todo, status: !todo.status };
          }
          return todo;
        });
        return { ...state, list: newList };
      } catch (err) {
        console.error(err);
      }
    },
    deleteTodo(state, action) {
      try {
        const { id } = action.payload;
        const data = state.list.filter((element) => element._id !== id);
        console.log(id)
        return {
          list: data.length - 1 >= 0 ? data : "empty",
          length: state.length > 0 ? state.length - 1 : 0,
        };
      } catch (err) {
        console.error(err);
      }
    },
    todoEdit(state, action) {
      try {
        console.log(action.payload)
        const { _id, title, description, status } = action.payload;
        const newList = state.list.map((todo) => {
          if (todo._id === _id) {
            return { ...todo, status, title, description };
          }
          return todo;
        });
        return { ...state, list: newList };

      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const { done, getState, deleteTodo, todoEdit } = todoSlice.actions;
export default todoSlice.reducer;
