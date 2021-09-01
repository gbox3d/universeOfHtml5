
import axios from 'axios'
import React, { useState } from 'react'


//https://jsonplaceholder.typicode.com

const Exam03Axios = () => {


    const [showCase,showCaseSet]  = useState('')

    const [todos, todosSet] = useState([]);
    const [post,postSet]  =useState({})

    return (
        <div className="Exam03Axios">
            <div>
                <button className="rogan btn" onClick={async () => {
                    console.log('get')
                    showCaseSet('Wait')

                    try {
                        let { status, data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
                        console.log(status)
                        console.log(data)
                        todosSet(data)
                        showCaseSet('Get')
                    }
                    catch (e) {
                        console.log(e)
                        alert(e)
                        // showCaseSet('Err')

                    }
                }} > Get </button>
                <button className="rogan btn" onClick={async () => {
                    console.log('get')

                    showCaseSet('Wait')

                    try {
                        let { status, data } = await axios({
                            method: 'POST',
                            url: 'https://jsonplaceholder.typicode.com/posts',
                            data: JSON.stringify({
                                title: '마지막처럼',
                                body: '마지막처럼  마~마~지막처어럼 내일따윈 없는것처어럼',
                                userId: 1,
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            }
                        });
                        console.log(status)
                        console.log(data)
                        postSet(data)
                        showCaseSet('Post')
                    }
                    catch (e) {
                        console.log(e)
                        alert(e)
                        // showCaseSet('Error')

                    }
                }} > Post </button>


            </div>

            {
                showCase==="Get" &&
                <div className='todolist'>
                    <ul style={{
                        height: '200px',
                        overflow: 'auto'
                    }} >
                        {
                            todos.map((todo) => {
                                return (
                                    <li key={todo.id} >{todo.title}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
            {
                showCase==="Post" &&
                <div>
                    <h1>{post.title}</h1>
                    <h2>{post.body}</h2>
                </div>
            }
            {
                showCase==="Wait" &&
                <h1>wait....</h1>
            }
        </div>
    )
}

export default Exam03Axios;
