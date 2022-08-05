import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import { UserInfo } from './user-info';
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
		<Container className='container'>
            <Row>
				<Col xs={12} sm={4}>
					<Card>
						<Card.Body>
							<UserInfo 
								name={user.Username}  
								email={user.Email} 
							/>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} sm={8}>
					<Card>
						<Card.Body>
							<UpdateUser user={user} />
						</Card.Body>
					</Card>
				</Col>
            </Row>
			<Row className="Favorites">
				<FavoriteMovies
					movies={movies}
					favoriteMovies={favoriteMovies}
					currentUser={currentUser}
					token={token} />
			</Row>
			
			<Button className="danger" variant="outline-danger" onClick={handleDelete}>Delete profile</Button>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(ProfileView);