import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { Container } from 'reactstrap';
import './TodoList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const storedToken = sessionStorage.getItem('credentials');
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    // Function to fetch todos
    const fetchTodos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/todo`, {
                headers: { 'Authorization': `Basic ${storedToken}` }
            });
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
            if ((error.response && error.response.status === 403) || (error.response && error.response.status === 401)) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [navigate]);

    // Callback function for TodoItem to trigger a refresh
    const onTodoChange = () => {
        fetchTodos();
    };

    return (
        <Container className="todo-list-container">
            {todos.length === 0 ? (
                <p>No todos found. Add some!</p>
            ) : (
                todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onTodoChange={onTodoChange} />
                ))
            )}
        </Container>
    );
};

export default TodoList;
