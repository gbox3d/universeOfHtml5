import React, { useState, useEffect } from 'react';

export default function MsgBox(props) {

    // const [extra, setExtra] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [inputText, setInputText] = useState('');
    const [callbacks, setCallBacks ] = useState(null);

    // eslint-disable-next-line
    useEffect(() => {
        // console.log('MsgBox: useEffect');
        props.setInterface({
            state: 'ready',
            setText: (text) => {
                setMsg(text);
            },
            setCallBack : ({onClose}) => {
                setCallBacks({
                    state: 'ready',
                    onClose: onClose
                });
            },
            open: ()=>{
                setIsOpen(true);
            },
            close: ()=>{
                setIsOpen(false);
            }       
        });
    },
    // eslint-disable-next-line
    []);

    return (
        <>
            {
                isOpen &&
                <div style={
                    {
                        margin: '10px',
                        padding: '10px',
                        border: '1px solid black',
                    }
                }>
                    <p>{msg}</p>

                    <div>
                        <input 
                        value={inputText}
                        onChange={(evt) => {
                            // console.log(evt.target.value);
                            setInputText(evt.target.value);
                        }} />
                    </div>
                    <button onClick={() => {
                        setIsOpen(false);
                        callbacks.onClose(inputText);

                    }}>Close</button>
                </div>
            }
        </>
    )

}
