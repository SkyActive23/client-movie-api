import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Col, Container, Row, Card } from 'react-bootstrap';

import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

import './profile-view.scss';

export function ProfileView(props) {
	const [user, setUser] = useState(props.user);
	const [movies, setMovies] = useState(props.movies);
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const currentUser = localStorage.getItem('user');
	const token = localStorage.getItem('token');

	const getUser = () => {
		axios.get(`https://myapiflix.herokuapp.com/users/${currentUser}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(response => {
				setUser(response.data);
				setFavoriteMovies(response.data.FavoriteMovies)
			})
			.catch(error => console.error(error))
	}

	useEffect(() => {
		getUser();
	}, [])

	const handleDelete = () => {
		axios.delete(`https://myapiflix.herokuapp.com/users/${currentUser}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(() => {
				alert(`The account ${user.Username} was successfully deleted.`)
				localStorage.clear();
				window.open('/register', '_self');
			}).
			catch(error => console.error(error))
	}

	return (
		<Container className='profile-page'>
            <Card className="profile-form">
                <Row>
                    <Col>
                        <h4>Profile Info</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="label">Username:</Col>
                    <Col className="value">{user.Username}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Email:</Col>
                    <Col className="value">{user.Email}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Birthday:</Col>
                    <Col className="value">{user.Birthday}</Col>
                </Row>
            </Card>
			<Row className="Favorites">
				<FavoriteMovies
					movies={movies}
					favoriteMovies={favoriteMovies}
					currentUser={currentUser}
					token={token} />
			</Row>
			<UpdateUser user={user} />
			<Button className="danger" variant="outline-danger" onClick={handleDelete}>Delete profile</Button>
		</Container>
	)
}