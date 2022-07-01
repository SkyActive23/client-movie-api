import React, { useState } from 'react';
import { Nav, Navbar, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './profile-view.scss';

export function UpdateUser(props) {
    const { user } = props;
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthday, setBirthday] = useState('');
    const [ values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });

  // validate user inputs
    const validate =() => {
        let isReq = true;
        if (!username) {
            setValues({...values, usernameErr: 'Username required'});
            isReq = false;
        } else if (username.length < 2) {
            setValues({...values, usernameErr: 'Username must be at least 2 characters long'});
            isReq= false;
        }
        if (!password) {
            setValues({...values, passwordErr: 'Password required'});
            isReq = false;
        } else if (password.length < 6) {
            setValues({...values, passwordErr: 'Password must be at least 6 characters long'});
            isReq= false;
        }
        if (!email) {
            setValues({...values, emailErr: 'Email required'});
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({...values, emailErr: 'Enter valid email'});
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            const token = localStorage.getItem('token');
            axios.put(`https://myapiflix.herokuapp.com/users/${user.Username}`, {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            },
            {
                headers: { Authorization: `Bearer ${token}`}
             })
            .then(response => {
                console.log(response.data);
                alert('Profile was successfully updated.');
                window.open('/users/:username', '_self');
            })
            .catch(error => {
                console.error(error);
                alert('Unable to update profile.');
            });
        }
    };

    return (
        <>
            <h4>Update</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        placeholder='Enter a username'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder='Password must be 8 or more characters'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder='your@email.com'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type='text'
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        required
                        placeholder='your@email.com'/>
                </Form.Group>
                <Button variant='primary' type='submit'
                    onClick={handleSubmit}>
                    Update
                </Button>
            </Form>
        </>
    )
}
