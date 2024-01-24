import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';

const TodoItem = ({ todo, onTodoChange }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTodo, setEditedTodo] = useState({ ...todo });
    const storedToken = sessionStorage.getItem('credentials');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedTodo({
            ...editedTodo,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (!editMode) {
            setEditedTodo({ ...todo });
        }
    };

    const handleUpdateTodo = async () => {
        try {
            await axios.put(`http://localhost:8080/todo/${todo.id}`, editedTodo, {
                headers: { 'Authorization': `Basic ${storedToken}` },
            });
            onTodoChange();
            setEditMode(false);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const handleDeleteTodo = async () => {
        try {
            await axios.delete(`http://localhost:8080/todo/${todo.id}`, {
                headers: { 'Authorization': `Basic ${storedToken}` },
            });
            onTodoChange();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <Row className="todo-item-row">
            <Col xs={6}>
                <FormGroup>
                    {editMode ? (
                        <>
                            <Input type="text" name="title" value={editedTodo.title} onChange={handleInputChange} />
                            <Input type="textarea" name="description" value={editedTodo.description} onChange={handleInputChange} />
                            <Input type="date" name="date" value={editedTodo.date} onChange={handleInputChange} />
                            <Label check>
                            </Label>
                        </>
                    ) : (
                        <>
                            <strong>{todo.title}</strong>
                            <p>{todo.description}</p>
                            <p>Due Date: {todo.date}</p>
                        </>
                    )}
                </FormGroup>
            </Col>
            <Col xs={3}>
                <Button color="primary" onClick={editMode ? handleUpdateTodo : toggleEditMode}>
                    {editMode ? 'Save' : 'Edit'}
                </Button>
            </Col>
            <Col xs={3}>
                <Button color="danger" onClick={handleDeleteTodo}>Delete</Button>
            </Col>
        </Row>
    );
};

export default TodoItem;
