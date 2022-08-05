import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Nav, Navbar, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import './login-view.scss';

import { connect } from 'react-redux'
import { setUser } from '../../actions/actions';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
// Send a request to the server for authentication
    axios.post('https://myapiflix.herokuapp.com/login', {
        Username: username,
        Password: password
    })
    .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
    })
    .catch(e => {
        console.log('no such user')
    });
};


  return (

        <Container className="Background">

                <Row>
                    <Col>
                        <CardGroup className='LogCardGroup'>
                            <Card>
                                <Card.Body className="LogCard">
                                    <Card.Title className='title'><h4>Login Here</h4></Card.Title>
                                    <Form>
                                        <Form.Group controlId="formUsername">
                                            <Form.Label>Username:</Form.Label>
                                            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleSubmit} className="button">
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

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired
  }

const mapStateToProps = (state) => {
    return {
		user: state.user
	};
}

export default connect(mapStateToProps, { setUser })(LoginView);