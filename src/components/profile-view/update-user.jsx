import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Col, Container, Form, Row, Card } from 'react-bootstrap';

import './profile-view.scss';

export function UpdateUser(props) {
	const { user } = props;
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [values, setValues] = useState({
		usernameErr: '',
		passwordErr: '',
		emailErr: '',
	});

	// validate user inputs
	const validate = () => {
		let isReq = true;
		if (!username) {
			setValues({ ...values, usernameErr: 'Username required' });
			isReq = false;
		} else if (username.length < 2) {
			setValues({ ...values, usernameErr: 'Username must be at least 2 characters long' });
			isReq = false;
		}
		if (!password) {
			setValues({ ...values, passwordErr: 'Password required' });
			isReq = false;
		} else if (password.length < 6) {
			setValues({ ...values, passwordErr: 'Password must be at least 6 characters long' });
			isReq = false;
		}
		if (!email) {
			setValues({ ...values, emailErr: 'Email required' });
			isReq = false;
		} else if (email.indexOf('@') === -1) {
			setValues({ ...values, emailErr: 'Enter valid email' });
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
					headers: { Authorization: `Bearer ${token}` }
				})
				.then((response) => {
					console.log(response.data);
					// since the username response is coming back as the previous. We are going to use the username state we have from the input to update localStorage and the url.
					setPassword(response.data.Password);
					setEmail(response.data.Email);
					setBirthday(response.data.Birthday);
					//   localStorage.removeItem("user");
					localStorage.setItem("user", username);
					//   alert("Profile was successfully updated.");
					window.open(`/users/${username}`, "_self");
				})
				.catch((error) => {
					console.error(error);
					alert("Unable to update profile.");
				});
		}
	};

	return (
		<>
			<h4>Edit profile</h4>
				<Form>
					<Form.Group controlId="formUsername">
						<Form.Label className="label">Username:</Form.Label>
						<Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
						{/* display validation error */}
						{values.usernameErr && <p>{values.usernameErr}</p>}
					</Form.Group>
					<Form.Group controlId="formPassword">
						<Form.Label className="label">Password:</Form.Label>
						<Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
						{/* display validation error */}
						{values.passwordErr && <p>{values.passwordErr}</p>}
					</Form.Group>
					<Form.Group controlId="formEmail">
						<Form.Label className="label">Email:</Form.Label>
						<Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" required />
						{/* display validation error */}
						{values.emailErr && <p>{values.emailErr}</p>}
					</Form.Group>
					<Form.Group controlId="formBirthday">
						<Button className='edit' onClick={handleSubmit}>Update Profile</Button>
					</Form.Group>
				</Form>
		</>
	)
}