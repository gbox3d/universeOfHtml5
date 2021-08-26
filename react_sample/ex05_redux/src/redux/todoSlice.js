import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync', //type
  async (_, { rejectWithValue }) => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
      console.log(resp)
      if (resp.ok) {
        const todos = await resp.json();

        //3초대기 
        await new Promise((resolve,resject)=> {
          setTimeout(resolve,1500)
        });


        return { todos: todos }; //playload
      }
      else {
        return rejectWithValue([], resp);

      }
    }
    catch (err) {
      return rejectWithValue([], err);

    }

  }
);

export const todoSlice = createSlice({
  name: 'todos',
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
      state.todoList.push(todo);
    },
    toggleComplete: (state, action) => {
      console.log('click')
      const index = state.todoList.findIndex((todo) => todo.id === action.payload.id);
      state.todoList[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.todoList.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log(state)
      state.currentRequestId = action.meta;
      state.loading = "pending";
      state.error = ""
      console.log('panding...')
    },
    [getTodosAsync.rejected]: (state, action) => {
      console.log('rejext')
      if (state.currentRequestId === action.meta) {
        state.currentRequestId = action.meta;
        state.loading = "fin";
        state.todoList = action.payload;
        state.error = action.error;
      }
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log(action)
      console.log('fullfilled')
      if (action.meta.requestId === state.currentRequestId.requestId) {
        state.todoList = action.payload.todos;
        state.loading = "fin";
        state.currentRequestId = "";
      }
    },
  }
})

// export default todoSlice;