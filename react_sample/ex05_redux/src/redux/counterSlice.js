import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const asyncLoadCountValue = createAsyncThunk(
    'counter/asyncLoadCountValue',
    async (delay, { rejectWithValue }) => {

        try {

            await await new Promise((resolve, reject) => {
                setTimeout(resolve, delay)
            })

            return {
                count : (localStorage.getItem('count') ? localStorage.getItem('count') : 0) 
            }
            // console.log(`load local ${state.count}`)
        }
        catch (err) {
            rejectWithValue([],err)
        }


    }
)

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        fsm: 'startup',
        currentRequestId: "",
        count: 0
    },
    reducers: {
        inc: (state, action) => {
            console.log('action inc')
            state.count++;
            localStorage.setItem('count', state.count)
        },
        set: (state, action) => {
            state.count = action.payload.value
            localStorage.setItem('count', state.count)
        },
        // loadLocal : (state,action) => {
        //     state.count = 

        //     console.log(`load local ${state.count}`)

        // }
    },
    extraReducers: {
        [asyncLoadCountValue.pending]: (state, action) => {

            state.currentRequestId = action.meta;
            state.fsm = "pending";
            state.error = ""
            console.log('panding...')
        },
        [asyncLoadCountValue.fulfilled]: (state, action) => {

            state.currentRequestId = action.meta;
            state.fsm = "fin";
            state.error = ""
            state.count = action.payload.count
            console.log('fullfilled')
        },
        [asyncLoadCountValue.rejected]: (state, action) => {

            state.currentRequestId = action.meta;
            state.fsm = "fin";
            state.error = action.error
            state.count = action.payload.count
            console.log('fullfilled')
        }

    }
})

// export default counterSlice.reducer
export { counterSlice,asyncLoadCountValue }