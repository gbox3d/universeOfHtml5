import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import helloThunk from '../redux/helloThunk'
import {fetchToDoList} from '../redux/helloThunk'

const HelloThunk = () => {
	const dispatch = useDispatch();
	const {helloThunk} = useSelector((state) => state);

    console.log(helloThunk)

	useEffect(() => {
        dispatch(fetchToDoList());

	}, [dispatch]);

	return (
		<div>
            <h1>Redux Test</h1>
            
        </div>
	);
};

// export default Counter;
export default  HelloThunk