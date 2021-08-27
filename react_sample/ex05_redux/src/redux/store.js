import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './todoSlice';
import counterReducer from './counterSlice'
import todoReducer from './todoSlice';
// import {helloThunkSlice} from "./helloThunk"

export default configureStore({
	reducer: {
		counter: counterReducer,
		todos : todoReducer,
	},
});