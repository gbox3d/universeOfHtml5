import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './todoSlice';
import counterSlice from './counterSlice'

export default configureStore({
	reducer: {
		counter: counterSlice.reducer
	},
});