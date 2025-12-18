import React from 'react';
import { Form, Button } from 'react-bootstrap';
import GlassPage from '../components/GlassPage';

const Contact = () => {
    return (
        <GlassPage title="Contact Us">
            <p className="text-center text-light opacity-75 mb-4">
                Have questions or feedback? We'd love to hear from you.
            </p>
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        className="bg-dark text-white border-secondary"
                        style={{ padding: '12px' }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your Name"
                        className="bg-dark text-white border-secondary"
                        style={{ padding: '12px' }}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="How can we help?"
                        className="bg-dark text-white border-secondary"
                        style={{ padding: '12px' }}
                    />
                </Form.Group>
                <div className="d-grid">
                    <Button variant="danger" size="lg" type="submit">
                        Send Message
                    </Button>
                </div>
            </Form>
        </GlassPage>
    );
};

export default Contact;
