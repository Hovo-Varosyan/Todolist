import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: { list: [], length: 0 },
    reducers: {
        getState(state, action) {
            console.log(action.payload)
            return { ...action.payload }
        },
        done(state, action) {
            try {
                const newList = state.list.map(todo => {
                    if (todo._id === action.payload) {
                        return { ...todo, status: !(todo.status) };
                    }
                    return todo;
                });
                return { ...state, list: newList }
            }
            catch (err) {
                console.error(err)
            }
        },
        deleteTodo(state, action) {
            try {
                const { id } = action.payload
                const data = state.list.filter((element) => element._id !== id)
                return { list: data, length: state.length - 1 }
            }
            catch (err) {
                console.error(err)
            }
        },
        todoEdit(state, action) {
            try {
                const { _id, title, description, status } = action.payload
                const newList = state.map(todo => {
                    if (todo._id === _id) {
                        return { ...todo, status, title, description };
                    }
                    return todo;
                });
                return { list: newList, ...state }
            } catch (err) {
                console.log(err)
            }
        }
    }
})

export const { done, getState, deleteTodo, todoEdit } = todoSlice.actions;
export default todoSlice.reducer