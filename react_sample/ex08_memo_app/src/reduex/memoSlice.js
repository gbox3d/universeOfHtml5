import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const memoSlice = createSlice({
    name: 'memo',
    initialState: {
        memoList: [],
    },
    reducers: {
        addMemo: (state, action) => {
            console.log("addMemo");
            state.memoList.push({
                id: nanoid(),
                text: action.payload,
                bEdit : false
            }
            );
        },
        removeMemo: (state, action) => {
            console.log("removeMemo");
            state.memoList = state.memoList.filter(memo => memo.id !== action.payload);
        },
        toggleEdit: (state, action) => {
            console.log("editMemo");
            state.memoList = state.memoList.map(memo => {
                if (memo.id === action.payload) {
                    memo.bEdit = !memo.bEdit;
                }
                return memo;
            }); 
        },
        updateMemo: (state, action) => {
            console.log("updateMemo");
            state.memoList = state.memoList.map(memo => {
                if (memo.id === action.payload.id) {
                    memo.text = action.payload.text;
                    // memo.bEdit = false;
                }
                return memo;
            });
        },
        test: (state, action) => {
            console.log("test");
        }
    }
});
