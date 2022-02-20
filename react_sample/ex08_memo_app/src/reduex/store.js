import { configureStore } from '@reduxjs/toolkit';
import {memoSlice} from './memoSlice';

export default configureStore({
    reducer: {
        memo: memoSlice.reducer,
    }
});