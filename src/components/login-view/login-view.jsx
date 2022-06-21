import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };


  return (

        <Container className="Background">
                <Navbar variant="dark" expand="lg" className="nav">
                    <Container>
                        <Navbar.Brand href="#home">ApiFlix</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Row>
                    <Col>
                        <CardGroup className='LogCardGroup'>
                            <Card>
                                <Card.Body className="LogCard">
                                    <Card.Title className='title'>Login Here</Card.Title>
                                    <Form>
                                        <Form.Group controlId="formUsername">
                                            <Form.Label>Username:</Form.Label>
                                            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={handleSubmit} className="button">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            
        </Container>
    );
}