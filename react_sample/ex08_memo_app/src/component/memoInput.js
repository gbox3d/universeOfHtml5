import React,{useState} from "react";

import { useDispatch } from "react-redux";
import { memoSlice } from "../reduex/memoSlice";

const MemoInput = ()=> {

    const [text, setText] = useState("");
    const dispatch = useDispatch();

    return (
        <div style={
            {
                margin: "10px",
                border: "1px solid #ccc",
                padding: "10px",
            }
        } >
        <input
          value={text}
          onChange={
            (evt) => {
              setText(evt.target.value);
            }
          }
        />
        <button
          onClick={
            async () => {
              console.log(text);
              dispatch(memoSlice.actions.addMemo(text));
              setText('');
            }
          }
        >Add</button>
      </div>
    )
}

export default MemoInput;