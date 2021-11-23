import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { memoSlice } from "../reduex/memoSlice";

export const MemoList = () => {

    const dispatch = useDispatch();
    const memo = useSelector(state => state.memo);

    return (
        <div>
            <ul>
                {
                    memo.memoList.map((item, index) => {
                        console.log(item);
                        return (
                            <li key={item.id}>

                                {
                                    item.bEdit ?
                                        <input type="text" value={item.text}
                                            onChange={(e) => dispatch(memoSlice.actions.updateMemo({
                                                text: e.target.value,
                                                id: item.id
                                            }
                                            ))}
                                        /> :
                                        <p>{item.text}</p>
                                }

                                <button
                                    onClick={
                                        () => {
                                            dispatch(memoSlice.actions.removeMemo(item.id));
                                        }
                                    }
                                > del</button>
                                <button
                                    onClick={
                                        () => {
                                            dispatch(memoSlice.actions.toggleEdit(item.id));
                                        }
                                    }
                                > edit</button>

                            </li>
                        )
                    }
                    )
                }

            </ul>
        </div>

    )
}

export default MemoList;