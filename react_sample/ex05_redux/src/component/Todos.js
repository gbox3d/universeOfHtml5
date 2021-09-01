import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { todoSlice } from '../redux/todoSlice';
import { getTodosAsync } from '../redux/todoSlice';

const Todos = () => {

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)

    console.log(todos);
    
    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    return (
        <div>
            <h1>Redux todos</h1>

            {
                todos.loading === "fin" ?
                    <ul style={
                        {
                            height: '200px',
                            overflow: 'auto'
                        }
                    } >
                        {
                            todos.todoList.map((todo) => {

                                return (
                                    <li
                                        onClick={
                                            () => {

                                                dispatch(todoSlice.actions.toggleComplete({ id: todo.id, completed: !todo.completed }))
                                            }
                                        }
                                        style={
                                            {
                                                backgroundColor: todo.completed ? 'green' : 'red',
                                                padding: '24px',
                                                color: 'white'
                                            }
                                        }
                                        key={todo.id} > {todo.title} ,{todo.completed ? "완료" : "미완료"} </li>
                                )
                            })
                        }
                    </ul>
                    :
                    <h3>padding.....</h3>
            }


        </div>
    )

}

export default Todos;