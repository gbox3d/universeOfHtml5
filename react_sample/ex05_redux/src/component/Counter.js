import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import counterSlice from '../redux/counterSlice'

const Counter = () => {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counter);

	useEffect(() => {
        console.log('Counter init')
		// dispatch();
	}, [dispatch]);

	return (
		<div>
            <h1>Redux Counter</h1>
            <h3>{counter.count}</h3>

            <button onClick={()=> {
                //호출하기 
                dispatch(counterSlice.actions.inc())

            }} > inc </button>

            <button onClick={()=> {
                //인자전달하기 
                dispatch(counterSlice.actions.set({value:1000}))

            }} > set 1000 </button>
        </div>
	);
};

export default Counter;