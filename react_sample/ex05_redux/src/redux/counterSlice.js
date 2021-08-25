import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {count:0},
    reducers: {
        inc: (state, action) => {
            console.log('action inc')
            state.count++;
        },
        set : (state,action) => {
            state.count = action.payload.value
        }
    }
})

// export default counterSlice.reducer
export default counterSlice