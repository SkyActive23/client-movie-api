import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Nav, Navbar, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        axios.post('https://myapiflix.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
            console.log('error registering the user')
        });
    }

    return (

        

        <Container className="Background">
            <Row>
                <Col>
                    <CardGroup className='RegCardGroup'>
                        <Card>
                            <Card.Body className="RegCard">
                                <Card.Title className='title'><h4>Register Here</h4></Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder='Enter Username'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="8" placeholder="Password here" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant='primary' type="submit" onClick={handleSubmit} className="button">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}
RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};