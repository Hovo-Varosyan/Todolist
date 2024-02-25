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
                    console.log(state)
                    if (todo._id === action.payload) {
                        return { ...todo, status: !(todo.status) };
                    }
                    return todo;
                });
            }
            catch (err) {
                console.log(err)
            }
        }
    }
})

export const { done, getState } = todoSlice.actions;
export default todoSlice.reducer