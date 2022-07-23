import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col, Row } from 'react-bootstrap';

import './profile-view.scss';

export function FavoriteMovies(props) {
	const { movies, favoriteMovies, currentUser, token } = props;

	const favoriteMoviesList = movies.filter((m) => {
		return favoriteMovies.includes(m._id);
	})

	const handleDelete = (movieId) => {
		axios.delete(`https://myapiflix.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(() => {
				alert(`The movie was successfully deleted.`)
				window.open('/users/:username', '_self');
			}).
			catch(error => console.error(error))
	}

	return (
		<Card className="Card-Box">
            <Row>
                <Col>
                    <h4>Favorite Movies</h4>
                </Col>
            </Row>
            <Row>
                {favoriteMoviesList.length === 0 ? (
                    <p>Fav list is empty! Add some movies!</p>
                ) : (
                    favoriteMoviesList.map((movie) => {
                        return (
                            <Col className='Movie' xs={12} md={6} lg={3} key={movie._id}>
                                <Card className='movie-card'>
                                    <Link to={`/movies/${movie._id}`}>
                                        {/* <Card.Img variant="top" src={movie.ImageURL}/> */}
                                    </Link>
                                    <Card.Body className='card-body'>
                                        <Card.Title>{movie.Title}</Card.Title>
                                    </Card.Body>
                                    <Button className="remove-button" size="sm" onClick={() => { handleDelete(movie._id) }} >
                                            Remove
                                    </Button>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Button className="open-button"  size="sm">
                                            Open
                                        </Button>
                                    </Link>
                                </Card>
                            </Col>
                        )
                    })
                )
                }

            </Row>
		</Card>
	)
}