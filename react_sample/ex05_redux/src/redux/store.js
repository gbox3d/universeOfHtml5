import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './todoSlice';
import {counterSlice} from './counterSlice'
import {todoSlice} from './todoSlice';
// import {helloThunkSlice} from "./helloThunk"

export default configureStore({
	reducer: {
		counter: counterSlice.reducer,
		todos : todoSlice.reducer,
		// helloThunk : helloThunkSlice.reducer
	},
});