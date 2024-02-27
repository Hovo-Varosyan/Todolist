import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: [],
    reducers: {
        getState(state, action) {
            return action.payload
        },
        done(state, action) {
            try {
                return state.map(todo => {
                    if (todo._id === action.payload) {
                        return { ...todo, status: !(todo.status) };
                    }
                    return todo;
                });
            }
            catch (err) {
                console.error(err)
            }
        },
        deleteTodo(state, action) {
            try {
                const { id } = action.payload
                const data = state.filter((element) => element._id !== id)
                return [...data]
            }
            catch (err) {
                console.error(err)
            }
        },
        todoEdit(state, action) {
            try {
                const { _id, title, description, status } = action.payload
                return state.map(todo => {
                    if (todo._id === _id) {
                        return { ...todo, status, title, description };
                    }
                    return todo;
                });
            } catch (err) {
                console.log(err)
            }
        }
    }
})

export const { done, getState, deleteTodo, todoEdit } = todoSlice.actions;
export default todoSlice.reducer