import React, { useState, useRef, useEffect } from 'react';
import './Todo.css';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

const Todo = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null); // Initialize ref
    const [editId , setEditID] = useState(0)

    const addTodo = () => {
   
         if(todo !== ''){
            setTodos([...todos, { list: todo, id: Date.now() , status : false}]); // Update todos state
            setTodo(''); // Clear the input field

         }

         if(editId){
            const editTodo = todos.find((todo) => todo.id === editId)
            const updateTodo = todos.map((to) => to.id === editTodo.id
            ? (to = {id : to.id , list : todo})
            : (to = {id : to.id , list : to.list}))
            setTodos(updateTodo)
            setEditID(0)
            setTodo('')
         }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.trim()) { // Ensure the todo is not empty
            addTodo();
        }
    };

    useEffect(() => {
        inputRef.current.focus(); // Set focus on the input when the component mounts
    }, []); // Run only once when the component mounts

    useEffect(() => {
        console.log(todos); // Log the updated todos whenever they change
    }, [todos]); // Runs when todos change

    const onDelete = (id) => {
        setTodos(todos.filter((to) => to.id !== id)); // Update state to remove the selected todo
    };

    const onComplete = (id) =>{

        let complete = todos.map((list) =>{
            if(list.id === id){
                return ({...list , status : !list.status})
            }
            return list
        })
        setTodos(complete)
    }

    const onEdit = (id) =>{

         let editTodo = todos.find((list) => list.id === id)
         setTodo(editTodo.list)
         setEditID(editTodo.id)
    }



    return (
        <div className="todo-container mt-5">
            <h2>TODO APP</h2>
            <form className='form-group' onSubmit={handleSubmit}>
                <input
                    className='form-control'
                    type="text"
                    ref={inputRef}
                    placeholder='Enter your ToDo'
                    value={todo}
                    onChange={(event) => setTodo(event.target.value)}
                />
                <button onClick={addTodo} > {editId ? 'EDIT' : 'ADD'}</button>
            </form>
            <div className='list'>
                <ul>
                    {todos.map((item) => (
                        <li className='list-items' key={item.id}> {/* Add key for each list item */}
                            <div className='list-item-list' id={item.status ? 'list-item' : ''}>{item.list}</div>
                            <span>
                                <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={()=> onComplete(item.id)} />
                                <CiEdit className='list-item-icons' id='edit' title='Edit' onClick={()=> onEdit(item.id)} />
                                <MdDeleteForever className='list-item-icons' id='delete' title='Delete' onClick={() => onDelete(item.id)} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
