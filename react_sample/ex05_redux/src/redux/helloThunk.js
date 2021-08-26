import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync', //type
    async () => {
        const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
        console.log(resp)
        if (resp.ok) {
            const todos = await resp.json();
            return { todos: todos }; //playload
        }
    }
);

// eslint-disable-next-line
export const helloThunkSlice = createSlice({
    name: "test",
    initialState: {
        todoList: [],
        currentRequestId: "",
        loading: "fin",
        error: "",
    },
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                completed: false,
            };
            state.push(todo);
        },
        toggleComplete: (state, action) => {
            console.log('click')
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },

    },
    extraReducers: {
        // [fetchToDoList.fulfilled]: (state, { meta, payload }) => {
        //     if (meta.requestId === state.currentRequestId.requestId) {
        //         state.todoList = payload;
        //         state.loading = "fin";
        //         state.currentRequestId = "";
        //         console.log('fulfilled')
        //     }
        // },
        [fetchToDoList.fulfilled]: (state, action) => {
            console.log(action)
            console.log('fulfilled')
            //   state = action.payload.todos
            // return action.payload.todos;
        },
        [fetchToDoList.pending]: (state, { meta }) => {
            state.currentRequestId = meta;
            state.loading = "pending";
            console.log('pending')
        },
        [fetchToDoList.rejected]: (state, { meta, payload, error }) => {
            if (state.currentRequestId === meta) {
                state.currentRequestId = meta;
                state.loading = "fin";
                state.todoList = payload;
                state.error = error;
                console.log('reject')
            }
        },
        // [updateToDo.fulfilled]: (state, { meta, payload }) => {
        //   if (meta.requestId === state.currentRequestId.requestId) {
        //     state.todoList = payload;
        //     state.loading = "fin";
        //     state.currentRequestId = "";
        //   }
        // },
        // [updateToDo.pending]: (state, { meta }) => {
        //   state.currentRequestId = meta;
        //   state.loading = "pending";
        // },
        // [updateToDo.rejected]: (state, { meta, payload, error }) => {
        //   if (state.currentRequestId === meta) {
        //     state.currentRequestId = meta;
        //     state.loading = "fin";
        //     state.todoList = payload;
        //     state.error = error;
        //   }
        // },
        // [addNewTodo.fulfilled]: (state, { meta, payload }) => {
        //   if (meta.requestId === state.currentRequestId.requestId) {
        //     state.todoList = payload;
        //     state.loading = "fin";
        //     state.currentRequestId = "";
        //   }
        // },
        // [addNewTodo.pending]: (state, { meta }) => {
        //   state.currentRequestId = meta;
        //   state.loading = "pending";
        // },
        // [addNewTodo.rejected]: (state, { meta, payload, error }) => {
        //   if (state.currentRequestId === meta) {
        //     state.currentRequestId = meta;
        //     state.loading = "fin";
        //     state.todoList = payload;
        //     state.error = error;
        //   }
        // },
    },
});

// export default reducer;