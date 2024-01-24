import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');  // Initialize as empty string

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTodo = { title, description, date: dueDate, isDone: false };
        
        try {
            const storedToken = sessionStorage.getItem('credentials');
            await axios.post(`http://localhost:8080/todo`, newTodo, {
                headers: { 'Authorization': `Basic ${storedToken}` },
            });
            // Clear the form fields after successful submission
            setTitle('');
            setDescription('');
            setDueDate('');
            // Optionally, handle any follow-up action like redirecting or displaying a success message
        } catch (error) {
            console.error("Error adding todo:", error);
            // Handle error (e.g., displaying an error message)
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter todo title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                placeholder="Enter todo description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dueDate">Due Date</Label>
                            <Input
                                type="date"
                                name="dueDate"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </FormGroup>
                        <Button type="submit" color="primary">Add Todo</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddTodo;
