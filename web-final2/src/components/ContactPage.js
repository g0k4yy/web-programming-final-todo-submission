import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const ContactPage = () => {
    const [contactData, setContactData] = useState({
        name: '',
        surname: '',
        email: '',
        question: ''
    });

    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(contactData); // Here you can handle the form submission
        alert("Thank you for your message!");
        setContactData({ name: '', surname: '', email: '', question: '' }); // Reset form fields
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                value={contactData.name}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="surname">Surname</Label>
                            <Input
                                type="text"
                                name="surname"
                                id="surname"
                                placeholder="Enter your surname"
                                value={contactData.surname}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={contactData.email}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="question">Question</Label>
                            <Input
                                type="textarea"
                                name="question"
                                id="question"
                                placeholder="Your Question"
                                value={contactData.question}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button type="submit" color="primary">Send Message</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;