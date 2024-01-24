import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { username, setUsername, password, setPassword } = useAuth();

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = btoa(`${username}:${password}`);

        try {
            const response = await axios.get(`http://localhost:8080/todo`, {
                headers: { 'Authorization': `Basic ${token}` }
            });

            if (response.status === 200 || response.status === 204) {
                // Update the context states if needed
                    console.log("success");
                    sessionStorage.setItem('credentials', token);
                    navigate('/todo');
            } else {
                console.log("Failed to auth");
            }
        } catch (error) {
            console.error("Login error:", error.response);
            // Handle login failure
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Username</Label>
                            <Input
                                type=""
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button type="submit" color="primary">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;